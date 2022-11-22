<?php

namespace Database\Seeders;

use Carbon\Carbon;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
            // 'id' => \Ramsey\Uuid\Uuid::uuid4()->toString(),
            'id' => "1-2",
            'name'=> 'ali fawzi lateef',
            'user_name'=> 'a9f_ssss',
            'email'=>'alifawzi@gmaill.coms',
            'password'=> password_hash('88888888',PASSWORD_DEFAULT),
            'verified_at'=> Carbon::now()->format('Y-m-d H:i:s'),
            'registered_at'=> Carbon::now()->format('Y-m-d H:i:s'),
            'birthdate'=> Carbon::parse('2000-01-01'),
            'category_id'=>"54feb0c7-135f-4794-a7c0-1f6732e34d6e",
            'profile_photo_url'=> '../../../src/image.path'
        ]);    
    }
}
