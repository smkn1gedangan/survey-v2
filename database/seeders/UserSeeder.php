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
            [
            "name"=>"admin",
            "email"=>"jonoundo88@gmail.com",
            "password"=>"7qvt6t2738",
            "role"=>"admin"
            ],
            [
            "name"=>"admin",
            "email"=>"paksutrisno934@gmail.com",
            "password"=>"4dm1n3219",
            "role"=>"admin"
            ]
        ];

        foreach ($datas as $data) {
            User::updateOrCreate(["email"=>$data["email"]],$data);
        }
    }
}
