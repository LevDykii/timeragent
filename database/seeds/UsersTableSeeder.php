<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\User::class)->create([
            'name' => 'TimerAgent Admin',
            'email' => 'info@timeragent.com',
            'password' => Hash::make('T1meIsMoney!'),
        ]);
    }
}