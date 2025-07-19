<?php

namespace App\Http\Controllers;

use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TahunAjaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = Cache::remember('tahunAjarans', 60 * 60 * 24 * 7, function () {
            return TahunAjaran::orderByRaw("aktif = 'yes' desc")->get(); // seluruh data guru
        });
        $perPage = 10;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentItems = collect($datas)->slice(($currentPage - 1) * $perPage, $perPage)->values();

        $tahunAjarans = new LengthAwarePaginator(
            $currentItems,
            count($datas),
            $perPage,
            $currentPage,
            ['path' => request()->url(), 'query' => request()->query()]
        );
        return Inertia::render("TahunAjaran/Index",[
            "tahunAjarans"=>$tahunAjarans
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
            "tahun"=>"required|min:8|max:13|unique:psb_tahun_ajaran,tahun_ajaran",
            "aktif"=>"string|required"
        ],[
            "tahun.required"=>"Tahun Ajaran Wajib Diisi",
            "tahun.unique"=>"Tahun Ajaran Telah Ada , Gunakan Tahun Lain",
            "tahun.min"=>"Tahun Ajaran Minimal 8 kata",
            "tahun.max"=>"Tahun Ajaran Maximal 13 kata",
        ]);

        TahunAjaran::where("aktif","=","yes")->update([
            "aktif"=>"no"
        ]);
        TahunAjaran::create([
            "tahun_ajaran"=> preg_replace("/\s*-\s*/"," - ",$data["tahun"])
,
            "aktif"=>$data["aktif"],
            "created_by"=>Auth::user()->name,
            "updated_by"=>Auth::user()->name,
        ]);
        Cache::delete("tahunAjarans");
        return redirect()->back()->with("success","Berhasil Menambah Tahun Ajaran Baru");
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
            "tahun"=>["required","min:7","max:13",Rule::unique('psb_tahun_ajaran', 'tahun_ajaran')->ignore($id,"ta_id")],
            "aktif"=>"string|required"
        ],[
            "tahun.required"=>"Tahun Ajaran Wajib Diisi",
            "tahun.unique"=>"Tahun Ajaran Telah Digunakan, Mohon Cari Yang Lain",
            "tahun.min"=>"Tahun Ajaran Minimal 8 kata",
            "tahun.max"=>"Tahun Ajaran Maximal 13 kata",
        ]);
        $taId = TahunAjaran::findOrFail($id);


        if($data["aktif"] === "yes"){
            TahunAjaran::where("aktif","=","yes")->update([
                "aktif"=>"no"
            ]);
        }

        $taId->tahun_ajaran = preg_replace("/\s*-\s*/"," - ",$data["tahun"]);
        $taId->aktif = $data["aktif"];
        $taId->save();

        Cache::delete("tahunAjarans");
        return redirect()->back()->with("success","Berhasil Mengubah Tahun Ajaran Baru");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $taId = TahunAjaran::findOrFail($id);
        if($taId){
            $taId->delete();
        }
        Cache::delete("tahunAjarans");
        return redirect()->back()->with("success","Berhasil Menambah Tahun Ajaran Baru");
    }
}
