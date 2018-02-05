<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'photo' => '/public/images/profile_photo_01.png',
        'password' => '$2y$10$.VqD0bic47QB4DPFUWcDDubD2UpZy3xxLlsJ4qn0nfCWcj2fy7D2i',
        'remember_token' => '6pM6H9x34e',
        'type' => 4,
        'state' => 0,
    ];
});
