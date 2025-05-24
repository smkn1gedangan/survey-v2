<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TahunAjaran extends Model
{
    protected $primaryKey = "ta_id";
    protected $table = "psb_tahun_ajaran";
    protected $fillable = ["tahun_ajaran","aktif","created_by","updated_by"];

    public $incrementing = true;
    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    // Jika pakai timestamps (tapi nama kolomnya bukan default), properti ini tetap diaktifkan
    public $timestamps = true;
}
