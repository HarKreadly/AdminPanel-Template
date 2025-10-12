<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ProfileAddressUpdateRequest;

class ProfileController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Profile/Index');
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
