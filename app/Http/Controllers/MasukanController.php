<?php

namespace App\Http\Controllers;

use App\Mail\MasukanVerificationMail;
use App\Models\Masukan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MasukanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Contact");
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
        $validated = $request->validate([
            "nama"=>"string|min:5",
            "email"=>"string|email",
            "user_id"=>"required|unique:masukans,user_id",
            "masukan"=>"required|min:5",
        ],[
            "user_id.unique"=> "Setiap 1 akun hanya dibatasi 1 Pengiriman Feedback",
            "masukan.required"=> "Feedback Wajib Diisi dan Minimal 5 Huruf",
        ]);

        // if(!$request->user()->hasVerifiedEmail()){
        //     return redirect()->route('verification.notice');
        // };

        Masukan::create([
            "user_id"=>$validated["user_id"],
            "masukan"=>$validated["masukan"],
        ]);

        return redirect()->back()->with("success",true);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
