<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataSiswaController;
use App\Http\Controllers\ExpController;
use App\Http\Controllers\FeController;
use App\Http\Controllers\JurusanController;
use App\Http\Controllers\PekerjaanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TahunAjaranController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(FeController::class)->group(function(){
    Route::get("/","welcome")->name("welcome");
    Route::get("/responden","responden")->name("responden");
    Route::post("/store-data-siswa","storeDataSiswa")->name("store-data-siswa");
    Route::get("/export_data_siswa_to_pdf/{id}",[ExpController::class,"exportDataSiswaToPdf"])->name("export_data_siswa_to_pdf");
});

Route::middleware(["auth","verified"])->group(function(){
    Route::get("/dashboard",[DashboardController::class,"index"])->name("dashboard");
    Route::resource("tahunAjaran",TahunAjaranController::class);
    Route::resource("jurusan",JurusanController::class);
    Route::resource("pekerjaan",PekerjaanController::class);
    Route::resource("dataSiswa",DataSiswaController::class);
    Route::get("/export_data_siswa_to_pdf_admin/{id}",[ExpController::class,"exportDataSiswaToPdfAdmin"])->name("export_data_siswa_to_pdf_admin");


    Route::get("/export_data_siswa",[ExpController::class,"exportDataSiswa"])->name("exp_data_siswa");
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
