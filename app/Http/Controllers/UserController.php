<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique(User::class)],
            'phone' => ['nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:male,female,other'],
            'bio' => ['nullable', 'string'],
            'country' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'zip_code' => ['nullable', 'string', 'max:20'],
            'time_zone' => ['nullable', 'string', 'max:255'],
            'role' => ['required', 'in:user,company,admin'],
            'status' => ['required', 'in:active,inactive,banned'],
            'verified' => ['nullable', 'boolean'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'profile_picture' => ['nullable', 'image', 'max:2048'],
        ]);

        if (empty($validated['name'])) {
            $validated['name'] = trim(implode(' ', array_filter([
                $validated['first_name'] ?? null,
                $validated['middle_name'] ?? null,
                $validated['last_name'] ?? null,
            ])));
        }

        if (!empty($validated['profile_picture'])) {
            $validated['profile_picture'] = $request
                ->file('profile_picture')
                ->store('profile-pictures', 'public');
        }

        $validated['verified'] = $request->boolean('verified');
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return Redirect::route('users.index')
            ->with('status', 'User created successfully.');
    }

    public function view(int $id): Response
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/View', [
            'user' => $user,
        ]);
    }

    public function edit(int $id): Response
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
    }

    public function destroy(int $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        $user->delete();

        return Redirect::route('users.index')
            ->with('status', 'User deleted successfully.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:male,female,other'],
            'bio' => ['nullable', 'string'],
            'country' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'zip_code' => ['nullable', 'string', 'max:20'],
            'time_zone' => ['nullable', 'string', 'max:255'],
            'role' => ['required', 'in:user,company,admin'],
            'status' => ['required', 'in:active,inactive,banned'],
            'verified' => ['nullable', 'boolean'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'profile_picture' => ['nullable', 'image', 'max:2048'],
        ]);

        if (empty($validated['name'])) {
            $validated['name'] = trim(implode(' ', array_filter([
                $validated['first_name'] ?? null,
                $validated['middle_name'] ?? null,
                $validated['last_name'] ?? null,
            ])));
        }

        if ($request->boolean('remove_profile_picture')) {
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            $validated['profile_picture'] = null;
            unset($validated['remove_profile_picture']);
        }

        if (!empty($validated['profile_picture'])) {
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            $validated['profile_picture'] = $request
                ->file('profile_picture')
                ->store('profile-pictures', 'public');
        }

        $validated['verified'] = $request->boolean('verified');

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return Redirect::route('users.index')
            ->with('status', 'User updated successfully.');
    }
}
