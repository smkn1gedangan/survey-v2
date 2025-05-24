<?php

namespace App\Http\Controllers;

use App\Models\Jurusan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JurusanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jurusans = Jurusan::latest()->paginate(10);
        
        return Inertia::render("Jurusan/Index",[
            "jurusans"=>$jurusans
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
            "nama"=>"string|required|min:3|max:20|unique:jurusans,nama",
            "samaran"=>"string|required|min:2|max:10|unique:jurusans,samaran"
        ],[
            "nama.required"=>"Nama Jurusan Wajib Diisi",
            "nama.unique"=>"Nama Jurusan Telah Ada , Gunakan Nama Lain",
            "nama.min"=>"Nama Jurusan Minimal 3 kata",
            "nama.max"=>"Nama Jurusan Maximal 20 kata",
            "samaran.required"=>"value Wajib Diisi",
            "samaran.unique"=>"value Telah Ada , Gunakan Nama Lain",
            "samaran.min"=>"value Minimal 2 kata",
        ]);

        Jurusan::create([
            "nama"=>$data["nama"],
            "samaran"=>$data["samaran"],
        ]);

         return redirect()->back()->with("success","Berhasil Menambah Nama Jurusan Baru");
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
            "nama"=>"string|required|min:3|max:20",
            "samaran"=>"string|required|min:1|max:10",
        ],[
            "nama.required"=>"Nama Jurusan Wajib Diisi",
            "nama.min"=>"Nama Jurusan Minimal 3 kata",
            "nama.max"=>"Nama Jurusan Maximal 20 kata",
            "samaran.required"=>"Value Wajib Diisi",
            "samaran.min"=>"Value Minimal 2 kata",
            "samaran.max"=>"Value Maximal 10 kata",
        ]);


        $jurusanId = Jurusan::findOrFail(($id));
        $jurusanId->nama = $data["nama"];
        $jurusanId->samaran = $data["samaran"];
        $jurusanId->save();
        
        
        return redirect()->back()->with("success","Berhasil Mengubah Nama Jurusan Baru");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jurusanId = Jurusan::findOrFail(($id));
        if($jurusanId){
            $jurusanId->delete();
        }

         return redirect()->back()->with("success","Berhasil Menghapus Nama Jurusan");
    }
}
