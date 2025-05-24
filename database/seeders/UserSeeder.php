<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            "name"=>"admin",
            "email"=>"example@gmail.com",
            "password"=>"7qvt6t2738"
        ];

        User::create($datas);
    }
}
