<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ProfileAddressUpdateRequest;
use Jenssegers\Agent\Agent;

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();

        // Fetch and parse user sessions
        $sessions = DB::table('sessions')
            ->where('user_id', $user->id)
            ->orderBy('last_activity', 'desc')
            ->get();

        // Process sessions to extract device/browser info
        $activeSessions = $sessions->map(function ($session) use ($request) {
            $agent = new Agent();
            $agent->setUserAgent($session->user_agent);

            return [
                'id' => $session->id,
                'ip_address' => $session->ip_address,
                'is_current_device' => $session->id === $request->session()->getId(),
                'last_activity' => $session->last_activity,
                'agent' => [
                    'platform' => $agent->platform() ?: 'Unknown',
                    'browser' => $agent->browser() ?: 'Unknown',
                ],
            ];
        });

        return Inertia::render('Profile/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'first_name' => $user->first_name,
                'middle_name' => $user->middle_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at?->format('Y-m-d H:i:s'),
                'phone' => $user->phone,
                'date_of_birth' => $user->date_of_birth,
                'gender' => $user->gender,
                'profile_picture' => $user->profile_picture,
                'bio' => $user->bio,
                'country' => $user->country,
                'city' => $user->city,
                'province' => $user->province,
                'address' => $user->address,
                'zip_code' => $user->zip_code,
                'time_zone' => $user->time_zone,
                'role' => $user->role,
                'status' => $user->status,
                'verified' => $user->verified,
                'created_at' => $user->created_at->format('Y-m-d'),
                'updated_at' => $user->updated_at->format('Y-m-d'),
                'deleted_at' => $user->deleted_at ? $user->deleted_at->format('Y-m-d') : null,
            ],
            'sessions' => $activeSessions,
            'auth' => [
                'user' => $user
            ]
        ]);
    }





    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile picture.
     */
    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'nullable|image|max:2048',
        ]);

        $user = $request->user();

        if ($request->hasFile('profile_picture')) {
            // Delete old picture if exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            // Store new picture
            $path = $request->file('profile_picture')->store('profile-pictures', 'public');
            $user->profile_picture = $path;
        } elseif ($request->has('profile_picture') && $request->profile_picture === null) {
            // Handle deletion
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }
            $user->profile_picture = null;
        }

        $user->save();
    }

    /**
     * Update the user's profile information.
     */
    public function updateProfileInformation(ProfileUpdateRequest $request)
    {
        $user = $request->user();

        $user->fill($request->validated());

        if ($request->filled('first_name') || $request->filled('last_name')) {
            $nameParts = array_filter([
                $request->first_name,
                $request->middle_name,
                $request->last_name
            ]);
            $user->name = !empty($nameParts) ? implode(' ', $nameParts) : $user->name;
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();
    }

    /**
     * Update the user's profile address.
     */
    public function updateAddressInformation(ProfileAddressUpdateRequest $request)
    {
        $user = $request->user();

        $user->fill($request->validated());

        $user->save();
    }









    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
