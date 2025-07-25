<?php

namespace App\Http\Controllers;

use App\Models\DataSiswa;
use App\Models\Jurusan;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataSiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tahunAjarans = TahunAjaran::orderByRaw("aktif = 'yes' desc")->get();
        $jurusans = Jurusan::get();


        
        $dataSiswas = DataSiswa::with('psb_tahun_ajaran')
            ->when($request->filled(""), function ($query) use ($request) {
                // Filter tahun dulu jika ada
                $query->whereHas('psb_tahun_ajaran', function ($q2) use ($request) {
                    $q2->where('tahun_ajaran', $request->input("tahun"));
                });
            })
            ->when($request->filled("filtering"),function($query) use($request){
                $query->where("jurusan","=",$request->input("filtering"));
            })
            ->when($request->input("search"), function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('nama_calon_siswa', 'like', '%' . $request->input("search") . '%')
                    ->orWhere('asal_sekolah', 'like', '%' . $request->input("search") . '%')
                    ->orWhere('nama_ayah', 'like', '%' . $request->input("search") . '%')
                    ->orWhere('nama_ibu', 'like', '%' . $request->input("search") . '%');
                });
            })->orderBy($request->input("sort_by","created_date"),$request->input("sort_order","asc"))
            ->paginate(10)->withQueryString();



        return Inertia::render("DataSiswa/Index",[
            "dataSiswas" => $dataSiswas,
            "tahunAjarans" => $tahunAjarans,
            "jurusans" => $jurusans,
            "filters"=> $request->only(["tahun","search","sort_by","sort_order","filtering"])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        // dd($request->status_penerimaan);
        $dataId = DataSiswa::findOrFail($id);

        if($dataId){
            $dataId->status_penerimaan =  $request->status_penerimaan ?? "pending";

        }
        $dataId->save();
        return redirect()->back()->with("success","Berhasil Mengubah Data Siswa");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataId = DataSiswa::findOrFail($id);

        if($dataId){
            $dataId->delete();
        }
        return redirect()->back()->with("success","Berhasil Menghapus Data Siswa");
    }
}
