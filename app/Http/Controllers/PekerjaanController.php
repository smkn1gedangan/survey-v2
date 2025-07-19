<?php

namespace App\Http\Controllers;

use App\Models\Pekerjaan;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PekerjaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = Cache::remember('pekerjaans', 60 * 60 * 24 * 7, function () {
            return Pekerjaan::orderBy("nama","asc")->latest()->get(); // seluruh data guru
        });
        $perPage = 10;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentItems = collect($datas)->slice(($currentPage - 1) * $perPage, $perPage)->values();

        $pekerjaans = new LengthAwarePaginator(
            $currentItems,
            count($datas),
            $perPage,
            $currentPage,
            ['path' => request()->url(), 'query' => request()->query()]
        );
        return Inertia::render("Pekerjaan/Index",[
            "pekerjaans"=>$pekerjaans
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
         $data = $request->validate([
            "nama"=>"string|required|min:3|max:20|unique:pekerjaans,nama"
        ],[
            "nama.required"=>"Nama Pekerjaan Wajib Diisi",
            "nama.unique"=>"Nama Pekerjaan Telah Ada , Gunakan Nama Lain",
            "nama.min"=>"Nama Pekerjaan Minimal 3 kata",
            "nama.max"=>"Nama Pekerjaan Maximal 20 kata",
        ]);

        Pekerjaan::create([
            "nama"=>$data["nama"]
        ]);
        Cache::delete("pekerjaans");
         return redirect()->back()->with("success","Berhasil Menambah Nama Nama Pekerjaan Baru");
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
         $data = $request->validate([
            "nama"=>"string|required|min:3|max:20"
        ],[
            "nama.required"=>"Nama Pekerjaan Wajib Diisi",
            "nama.min"=>"Nama Pekerjaan Minimal 3 kata",
            "nama.max"=>"Nama Pekerjaan Maximal 20 kata",
        ]);


        $pekerjaanId = Pekerjaan::findOrFail(($id));
        $pekerjaanId->nama = $data["nama"];
        $pekerjaanId->save();
        
        Cache::delete("pekerjaans");
        return redirect()->back()->with("success","Berhasil Mengubah Nama Pekerjaan");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pekerjaanId = Pekerjaan::findOrFail(($id));
        if($pekerjaanId){
            $pekerjaanId->delete();
        }
        Cache::delete("pekerjaans");
         return redirect()->back()->with("success","Berhasil Menghapus Nama Pekerjaan");
    }
}
