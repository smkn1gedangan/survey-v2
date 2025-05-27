<?php

namespace App\Http\Controllers;

use App\Models\DataSiswa;
use App\Models\Masukan;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)  {

        $data = DataSiswa::with("psb_tahun_ajaran")
        ->selectRaw("psb_tahun_ajaran.tahun_ajaran as tahun,count(*) as total")
        ->join("psb_tahun_ajaran","psb_tahun_ajaran.ta_id","=","psb_data_siswa.ta_id")
        ->groupBy("psb_tahun_ajaran.tahun_ajaran")
        ->orderBy("psb_tahun_ajaran.tahun_ajaran","asc")
        ->get();

        $masukans = Masukan::with("user")->latest()->paginate(5);
        $dataDonut = DataSiswa::where("ta_id",$request->input("ta"))->select("jurusan",DB::raw("count(*) as total")) ->groupBy("jurusan")->get();


        $tahunAjarans = TahunAjaran::orderBy("tahun_ajaran","asc")->get();
        return Inertia::render("Dashboard",[
            "data"=>$data,
            "dataDonut"=>$dataDonut,
            "tahunAjarans"=>$tahunAjarans,
            "masukans"=>$masukans,
            "filters"=> $request->only(["ta"])
        ]);
    }

    public function hapusMasukan($id)  {
        $masukanId = Masukan::findOrFail($id);
        if($masukanId){
            $masukanId->delete();
        }
        return redirect()->back()->with("success","Berhasil Menghapus Data Feedback / Masukan Responden");
    }
}
