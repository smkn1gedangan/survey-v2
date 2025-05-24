<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('psb_data_siswa', function (Blueprint $table) {
            $table->renameColumn("nama_orang_tua_wali","nama_ayah");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('psb_data_siswa', function (Blueprint $table) {
            //
        });
    }
};
