<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
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
            'title' => '你爱谁如鲸向海',
            'csrf_token' => $token,
        ]);
    }
}
