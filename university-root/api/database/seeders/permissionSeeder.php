<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class permissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            'id' => \Ramsey\Uuid\Uuid::uuid4()->toString(),
            'name'=>"can add admins",
            // 'category_id'=>"12A-14S-24F",
        ]);  
    }
}
