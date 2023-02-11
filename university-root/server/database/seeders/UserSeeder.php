<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Ali Fawzi',
            'username' => 'ali ali',
            'registered_at'=> Carbon::now()->format('Y-m-d H:i:s'),
            'birthdate'=> Carbon::now()->format('Y-m-d'),
            'email' => 'ali@gmail.com',
            'password' => password_hash('88888888',PASSWORD_DEFAULT),
            'user_type' => 'admin',
        ]);
    }
}
