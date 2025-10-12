<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = $this->faker->randomElement(['male', 'female', 'other']);
        $firstName = $this->faker->firstName($gender);
        $lastName = $this->faker->lastName();

        return [
            'name' => $firstName . ' ' . $lastName,
            'first_name' => $firstName,
            'middle_name' => $this->faker->optional()->firstName(),
            'last_name' => $lastName,
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // change as needed

            'phone' => $this->faker->optional()->phoneNumber(),
            'date_of_birth' => $this->faker->optional()->date(),
            'gender' => $gender,

            'profile_picture' => $this->faker->optional()->imageUrl(),
            'bio' => $this->faker->optional()->paragraph(),

            'country' => $this->faker->optional()->country(),
            'city' => $this->faker->optional()->city(),
            'province' => $this->faker->optional()->state(),
            'address' => $this->faker->optional()->address(),
            'zip_code' => $this->faker->optional()->postcode(),
            'time_zone' => $this->faker->optional()->timezone(),

            'role' => $this->faker->randomElement(['user', 'company', 'admin']),
            'status' => $this->faker->randomElement(['active', 'inactive', 'banned']),
            'verified' => $this->faker->boolean(),

            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
