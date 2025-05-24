<?php

namespace Database\Seeders;

use App\Models\Pekerjaan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PekerjaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            ["nama"=>"Petani"],
            ["nama"=>"Pedagang"],
        ];
        foreach ($datas as $data) {
            Pekerjaan::create($data);
        }
    }
}
