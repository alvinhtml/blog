<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\Classify;

class WebController extends Controller
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

    /**
     * 首页
     */
    public function index(Request $request) {

        $token = $request->session()->get('_token');

        $article = Article::orderBy('created_at', 'desc')->select('id', 'title', 'classify_id', 'author', 'media', 'abstract', 'favor', 'created_at')->first()->toArray();

        $list = Article::orderBy('created_at', 'asc')->limit(10)->select('id', 'title', 'classify_id', 'author', 'media', 'abstract', 'favor', 'created_at')->get()->toArray();

        $classify = Classify::where('type', 0)->orderBy('updated_at', 'asc')->select('id', 'name', 'slug')->get()->toArray();

        // echo('<pre>');
        // print_r($classify);
        //
        // exit;


        return view('home.index',[
            'title' => '你爱谁如鲸向海 - 首页',
            'csrf_token' => $token,
            'article' => $article,
            'list' => $list,
            'classify' => $classify,
        ]);
    }

    /**
     * 文章列表
     */
    public function articles(Request $request) {

        $token = $request->session()->get('_token');

        $articles = Article::orderBy('created_at', 'asc')->limit(10)->select('id', 'title', 'classify_id', 'author', 'media', 'abstract', 'favor', 'year', 'created_at');

        $count = $articles->count();



        $list = $articles->get();

        // echo('<pre>');
        // print_r($count);
        //
        // exit;


        return view('article.list',[
            'title' => '你爱谁如鲸向海 - 日志列表',
            'csrf_token' => $token,
            'count' => $count,
            'list' => $list,
        ]);
    }

    /**
     * 文章
     */
    public function article(Request $request) {

        $token = $request->session()->get('_token');

        $article = Article::orderBy('created_at', 'desc')->select('id', 'title', 'classify_id', 'author', 'media', 'abstract', 'favor', 'created_at')->first()->toArray();

        $list = Article::orderBy('created_at', 'asc')->limit(10)->select('id', 'title', 'classify_id', 'author', 'media', 'abstract', 'favor', 'created_at')->get()->toArray();

        $classify = Classify::where('type', 0)->orderBy('updated_at', 'asc')->select('id', 'name', 'slug')->get()->toArray();

        // echo('<pre>');
        // print_r($classify);
        //
        // exit;


        return view('home.index',[
            'title' => '你爱谁如鲸向海',
            'csrf_token' => $token,
            'article' => $article,
            'list' => $list,
            'classify' => $classify,
        ]);
    }
}
