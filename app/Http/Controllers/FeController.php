<?php

namespace App\Http\Controllers;

use App\Models\DataSiswa;
use App\Models\Jurusan;
use App\Models\Pekerjaan;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class FeController extends Controller
{
    public function welcome()  {

        $pekerjaans = Pekerjaan::orderBy("nama","asc")->get();
        $jurusans = Jurusan::orderBy("nama","asc")->get();
        $ta = TahunAjaran::where("aktif","=","yes")->first();
        return Inertia::render("Welcome",[
            "pekerjaans"=>$pekerjaans,
            "jurusans"=>$jurusans,
            "ta"=>$ta,
        ]);
    }
    public function storeDataSiswa(Request $request)  {
        
        $dataValidate = $request->validate([
            "nama_calon_siswa"=>"required|min:3",
            "asal_sekolah"=>"required|min:3",
            "jurusan"=>"required|exists:jurusans,samaran",
            "tempat_lahir"=>"required|min:3",
            "tanggal_lahir"=>"required|min:3",
            "nama_ayah"=>"required|min:3",
            "nama_ibu"=>"required|min:3",
            "pekerjaan_ayah"=>"required|min:3",
            "pekerjaan_ibu"=>"required|min:3",
            "no_hp" => ["required", "regex:/^0[0-9]{9,12}$/"],
            "alamat_ortu"=>"required|min:3",
            "ta_id"=>"exists:psb_tahun_ajaran,ta_id",
            "g-recaptcha-response"=>"required"
        ],[
            "g-recaptcha-response.required"=>"Captcha Wajib di Centang",
            "nama_calon_siswa.required"=>"Nama Wajib Diisi",
            "asal_sekolah.required"=>"Asal Sekolah Wajib Diisi",
            "tanggal_lahir.required"=>"Tanggal Lahir Wajib Diisi",
            "nama_ayah.required"=>"Nama Ayah Wajib Diisi",
            "nama_ibu.required"=>"Nama Ibu Wajib Diisi",
            "pekerjaan_ayah.required"=>"Pekerjaan Ayah Dipilih",
            "pekerjaan_ibu.required"=>"Pekerjaan Ibu Dipilih",
            "alamat_ortu.required"=>"Alamat Ortu Wajib Diisi",
            "nama_calon_siswa.min"=>"Nama Minimal 3 Huruf",
            "nama_ayah.min"=>"Nama Ayah Minimal 3 Huruf ",
            "nama_ibu.min"=>"Nama Ibu Minimal 3 Huruf ",
            "no_hp.regex"=>"No Hp Wajib Diawal 0 dan 10 - 13 Karakter",
            "no_hp.required"=>"No Hp Wajib Diisi ",
            "jurusan.required"=>"Jurusan Wajib Dipilih",
            "tempat_lahir.required"=>"tempat Lahir Wajib Diisi ",
            "alamat_ortu.min"=>"Alamat Orang Tua Minimal 3 Huruf ",
        ]);

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
        'secret' => env('VITE_SECRET_KEY'),
        'response' => $request->input('g-recaptcha-response'),
        ]);
        if (!optional($response->json())['success']) {
        return back()->withErrors(['error' => 'Verifikasi CAPTCHA gagal.']);
    }


       $dataId = DataSiswa::where("nama_calon_siswa", $dataValidate["nama_calon_siswa"])
        ->where("tanggal_lahir_calon_siswa", $dataValidate["tanggal_lahir"])
        ->first();

        if ($dataId) {
            return redirect()->back()->with("error", "Nama dan Tanggal Lahir telah yang sama telah digunakan dan tersimpan di database sebelumnya.");
        }


        DataSiswa::create([
            "nama_ayah"=> $dataValidate["nama_ayah"],
            "nama_ibu"=> $dataValidate["nama_ibu"],
            "pekerjaan_orang_tua_wali"=> "Ibu: " . $dataValidate["pekerjaan_ibu"] . " , " . " Ayah: " . $dataValidate["pekerjaan_ayah"],
            "alamat_orang_tua_wali"=>  $dataValidate["alamat_ortu"],
            "jurusan"=>  $dataValidate["jurusan"],
            "telepon_orang_tua_wali"=>  $dataValidate["no_hp"],
            "nama_calon_siswa"=>  $dataValidate["nama_calon_siswa"],
            "asal_sekolah"=>  $dataValidate["asal_sekolah"],
            "tempat_lahir_calon_siswa"=>  $dataValidate["tempat_lahir"],
            "tanggal_lahir_calon_siswa"=>  $dataValidate["tanggal_lahir"],
            "ta_id"=>  $dataValidate["ta_id"],
            "created_by"=>  $request->ip(),
            "updated_by"=>  $request->ip(),
            
        ]);
         return redirect()->back()->with("success","Berhasil Menambah Data Siswa");
    }

    public function responden(Request $request)  {
        $tahunAjarans = TahunAjaran::orderByRaw("aktif = 'yes' desc")->get();
        $jurusans = Jurusan::get();
        $dataSiswas = DataSiswa::query()->with("psb_tahun_ajaran");

        $dataSiswas = DataSiswa::with('psb_tahun_ajaran')
            ->when($request->tahun, function ($query) use ($request) {
                // Filter tahun dulu jika ada
                $query->whereHas('psb_tahun_ajaran', function ($q2) use ($request) {
                    $q2->where('tahun_ajaran', $request->tahun);
                });
            })
            ->when($request->filtering,function($query) use($request){
                $query->where("jurusan","=",$request->filtering);
            })
            ->when($request->search, function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('nama_calon_siswa', 'like', '%' . $request->search . '%')
                    ->orWhere('asal_sekolah', 'like', '%' . $request->search . '%')
                    ->orWhere('nama_ayah', 'like', '%' . $request->search . '%')
                    ->orWhere('nama_ibu', 'like', '%' . $request->search . '%');
                });
            })->orderBy($request->input("sort_by","created_date"),$request->input("sort_order","asc"))
            ->paginate(10)->withQueryString();

        


        return Inertia::render("Responden",[
            "dataSiswas" => $dataSiswas,
            "jurusans" => $jurusans,
            "tahunAjarans" => $tahunAjarans,
            "filters"=> $request->only(["tahun","search","sort_by","sort_order","filtering"])
        ]);
    }
    public function statistik(Request $request)  {
        $data = DataSiswa::with("psb_tahun_ajaran")
        ->selectRaw("psb_tahun_ajaran.tahun_ajaran as tahun,count(*) as total")
        ->join("psb_tahun_ajaran","psb_tahun_ajaran.ta_id","=","psb_data_siswa.ta_id")
        ->groupBy("psb_tahun_ajaran.tahun_ajaran")
        ->orderBy("psb_tahun_ajaran.tahun_ajaran","asc")
        ->get();

        $dataDonut = DataSiswa::where("ta_id",$request->input("ta"))->select("jurusan",DB::raw("count(*) as total")) ->groupBy("jurusan")->get();


        $tahunAjarans = TahunAjaran::orderBy("tahun_ajaran","asc")->get();
        return Inertia::render("Statistik",[
            "data"=>$data,
            "dataDonut"=>$dataDonut,
            "tahunAjarans"=>$tahunAjarans,
            "filters"=> $request->only(["ta"])
        ]);
    }
    
}
