<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DataSiswa extends Model
{
    use HasFactory;
    protected $primaryKey = "data_id";
    protected $table = "psb_data_siswa";

    protected $fillable = ["nama_ayah","nama_ibu","pekerjaan_orang_tua_wali","alamat_orang_tua_wali","telepon_orang_tua_wali","jurusan","nama_calon_siswa",
    "asal_sekolah","tempat_lahir_calon_siswa","tanggal_lahir_calon_siswa","ta_id","created_by","updated_by"];

    public $incrementing = true;
    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    // Jika pakai timestamps (tapi nama kolomnya bukan default), properti ini tetap diaktifkan
    public $timestamps = true;

    public function psb_tahun_ajaran()  {
        return $this->BelongsTo(TahunAjaran::class,"ta_id","ta_id");
    }
}
