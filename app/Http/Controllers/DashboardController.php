<?php

namespace App\Http\Controllers;

use App\Models\DataSiswa;
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

        $dataDonut = DataSiswa::where("ta_id",$request->input("ta"))->select("jurusan",DB::raw("count(*) as total")) ->groupBy("jurusan")->get();


        $tahunAjarans = TahunAjaran::orderBy("tahun_ajaran","asc")->get();
        return Inertia::render("Dashboard",[
            "data"=>$data,
            "dataDonut"=>$dataDonut,
            "tahunAjarans"=>$tahunAjarans,
            "filters"=> $request->only(["ta"])
        ]);
    }
}
