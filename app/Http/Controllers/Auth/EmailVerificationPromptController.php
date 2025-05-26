<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        if($request->user()->hasVerifiedEmail()){
            if(Auth::user()->role === "admin"){
                return redirect()->intended(route("dashboard",absolute:false));
            }else{
                return redirect()->intended(route("masukan.index",absolute:false));

            }
        }


        return  Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
