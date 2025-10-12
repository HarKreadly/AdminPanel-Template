<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::withTrashed()
            ->select([
                'id',
                'name',
                'first_name',
                'middle_name',
                'last_name',
                'email',
                'phone',
                'date_of_birth',
                'gender',
                'profile_picture',
                'bio',
                'country',
                'city',
                'province',
                'address',
                'zip_code',
                'time_zone',
                'role',
                'status',
                'verified',
                'created_at',
                'updated_at',
                'deleted_at'
            ])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'first_name' => $user->first_name,
                    'middle_name' => $user->middle_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
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
                    'is_deleted' => $user->trashed(),
                ];
            });

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function view($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render(`Users/{$id}`, [
            'user' => $user,

        ]);
    }
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return redirect()->route('users.index');
    }
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('users.index');
    }
    
}
