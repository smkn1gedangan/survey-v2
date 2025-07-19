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
            "password"=>env("PASS_DB_SEED"),
            "role"=>"admin"
            ],
            [
            "name"=>"admin",
            "email"=>"paksutrisno934@gmail.com",
            "password"=>env("PASS_DB_SEED"),
            "role"=>"admin"
            ]
        ];

        foreach ($datas as $data) {
            User::updateOrCreate(["email"=>$data["email"]],$data);
        }
    }
}
