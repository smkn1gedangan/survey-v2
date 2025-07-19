<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DataSiswa>
 */
class DataSiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_ayah' => $this->faker->name('male'),
            'nama_ibu' => $this->faker->name('female'),
            'pekerjaan_orang_tua_wali' => $this->faker->jobTitle(),
            'alamat_orang_tua_wali' => $this->faker->address(),
            'telepon_orang_tua_wali' => $this->faker->phoneNumber(),
            'jurusan' => $this->faker->randomElement(['Rekayasa Perangkat Lunak', 'Teknik Kendaraan Ringan', 'Akuntansi', 'Multimedia']),
            'nama_calon_siswa' => $this->faker->name(),
            'asal_sekolah' => $this->faker->randomElement(['SMP Negeri 1', 'SMP Negeri 2', 'SMP Swasta Harapan', 'MTS Al-Hikmah']),
            'tempat_lahir_calon_siswa' => $this->faker->city(),
            'tanggal_lahir_calon_siswa' => $this->faker->date('Y-m-d', '2010-12-31'), // contoh tanggal lahir anak SMP
            'ta_id' => $this->faker->numberBetween(1, 5),
            'created_by' => 1, // atau bisa pakai factory user kalau ingin dinamis
            'updated_by' => 1,
        ];

    }
}
