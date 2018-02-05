<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call('UsersTableSeeder');
        $this->call(UsersTableSeeder::class);
    }
}


class UsersTableSeeder extends Seeder
{
    public function run()
    {
        App\User::create([
            'name' => 'alvin',
            'email' => 'alvinhtml@gmail.com',
            'photo' => '/public/images/profile_photo_01.png',
            'password' => '$2y$10$.VqD0bic47QB4DPFUWcDDubD2UpZy3xxLlsJ4qn0nfCWcj2fy7D2i',
            'remember_token' => '6pM6H9x34e',
            'type' => 0,
            'state' => 0,
        ]);

        factory(App\User::class, 100)->create();
    }
}
