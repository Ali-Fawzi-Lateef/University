<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class permissionCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permission_categories')->insert([
            'id' => \Ramsey\Uuid\Uuid::uuid4()->toString(),
            'name'=>"Boss"
        ]);  
    }
}
