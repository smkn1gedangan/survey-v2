<?php

namespace App\Http\Controllers;

use App\Models\Pekerjaan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PekerjaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pekerjaans = Pekerjaan::latest()->paginate(10);
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
            "nama"=>"string|required|min:3|max:20|unique:jurusans,nama"
        ],[
            "nama.required"=>"Nama Jurusan Wajib Diisi",
            "nama.unique"=>"Nama Jurusan Telah Ada , Gunakan Nama Lain",
            "nama.min"=>"Nama Jurusan Minimal 3 kata",
            "nama.max"=>"Nama Jurusan Maximal 20 kata",
        ]);

        Pekerjaan::create([
            "nama"=>$data["nama"]
        ]);

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
            "nama.required"=>"Nama Jurusan Wajib Diisi",
            "nama.min"=>"Nama Jurusan Minimal 3 kata",
            "nama.max"=>"Nama Jurusan Maximal 20 kata",
        ]);


        $pekerjaanId = Pekerjaan::findOrFail(($id));
        $pekerjaanId->nama = $data["nama"];
        $pekerjaanId->save();
        
        
        return redirect()->back()->with("success","Berhasil Mengubah Nama Jurusan Baru");
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

         return redirect()->back()->with("success","Berhasil Menghapus Nama Pekerjaan");
    }
}
