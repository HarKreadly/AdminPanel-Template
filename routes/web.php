<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/settings/edit', [ProfileController::class, 'edit'])->name('settings.edit');
    Route::patch('/settings/picture', [ProfileController::class, 'updateProfilePicture'])->name('profile.picture.update');
    Route::patch('/settings/information', [ProfileController::class, 'updateProfileInformation'])->name('profile.information.update');
    Route::patch('/settings/address', [ProfileController::class, 'updateAddressInformation'])->name('profile.address.update');
    Route::delete('/profile/delete', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{id}', [UserController::class, 'view'])->name('users.view');
    Route::get('/users/{id}/edit', [UserController::class,'edit'])->name('users.edit');
    Route::delete('/users/{id}', [UserController::class,'destroy'])->name('users.destroy');
});



require __DIR__ . '/auth.php';
