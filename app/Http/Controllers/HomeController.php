<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    public function index(Request $request) {

        $token = $request->session()->get('_token');

        return view('admin.index',[
            'title' => '登录',
            'name' => $token,
        ]);
    }

    

    public function login(Request $request) {

        $email = $request->input('email');
        $password = $request->input('password');

        $admin = DB::table('users')->where('password',app('hash')->orWhere('email', $email)->make($password))->first();

        if ( !empty($admin) ) {
            $request->session()->regenerate();
            $token = $request->session()->get('_token');
            DB::table('users')->where('email', $email)->update(['remember_token' => $token]);
        }
    }

    public function logout(Request $request) {

        $request->session()->flush();

    }
}
