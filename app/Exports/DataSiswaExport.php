<?php

namespace App\Exports;

use App\Models\DataSiswa;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class DataSiswaExport implements FromCollection,WithHeadings
{
    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $dataSiswas = DataSiswa::query()->with("psb_tahun_ajaran")
            ->when($this->request->tahun, function ($query) {
                // Filter tahun dulu jika ada
                $query->whereHas('psb_tahun_ajaran', function ($q2) {
                    $q2->where('tahun_ajaran', $this->request->tahun);
                });
            })
            ->when($this->request->search, function ($query) {
                $query->where(function ($q) {
                    $q->where('nama_calon_siswa', 'like', '%' . $this->request->search . '%')
                    ->orWhere('asal_sekolah', 'like', '%' . $this->request->search . '%')
                    ->orWhere('nama_orang_tua_wali', 'like', '%' . $this->request->search . '%');
                });
            })->orderBy($this->request->input("sort_by")?:"created_date",$this->request->input("sort_order","asc"))
            ->get()->map(function($item){
                return [
                    "Nama Calon Siswa"=>$item->nama_calon_siswa,
                    "TTL"=> $item->tempat_lahir_calon_siswa . "," .$item->tanggal_lahir_calon_siswa,
                    "Asal Sekolah"=> $item->asal_sekolah,
                    "Jurusan"=> $item->jurusan,
                    "Nama Orang Tua Wali"=> $item->nama_orang_tua_wali,
                    "Tanggal Daftar"=> $item->created_date,
                    "Status Penerimaan"=> $item->status_penerimaan === ""?"Pending":$item->status_penerimaan,
                ];
            });

        return $dataSiswas;
    }
    public function headings() : array {
        return [
                    "Nama Calon Siswa",
                    "TTL",
                    "Asal Sekolah",
                    "Jurusan",
                    "Nama Orang Tua Wali",
                    "Tanggal Daftar",
                    "Status Penerimaan"
        ];
    }
}
