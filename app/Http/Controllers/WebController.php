<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\Classify;
use App\Comment;

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

        $classifylist = [];
        foreach ($classify as $item) {
            $item['article_count'] = Article::where('classify_id', $item['id'])->count();
            $classifylist[] = $item;
        }


        return view('home.index',[
            'title' => '你爱谁如鲸向海 - 首页',
            'description' => '你爱谁如鲸向海的网络日志。',
            'keywords' => '你爱谁如鲸向海,博客,日志',
            'csrf_token' => $token,
            'article' => $article,
            'list' => $list,
            'classify' => $classifylist,
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


        return view('article.list',[
            'title' => '你爱谁如鲸向海 - 日志列表',
            'description' => '你爱谁如鲸向海的网络日志。',
            'keywords' => '你爱谁如鲸向海,博客,日志列表',
            'csrf_token' => $token,
            'subhead' => '日志列表',
            'count' => $count,
            'list' => $list,
        ]);
    }

    /**
     * 文章
     */
    public function article(Request $request, $id) {

        $token = $request->session()->get('_token');


        if (isset($id)) {
            $article = Article::where('id', $id)->first();
            $classify = $article->classify;
            $tag = $article->tags;
            $comment = Comment::where('article_id', $id)->with('belongsToCmment')->get();
            $comment_count = $comment->count();

            $description = empty($article->abstract) ? $article->title : $article->abstract;
            $tagArray = $tag->toArray();
            $keyword = [];
            foreach ($tagArray as $tagItem) {
                $keyword[] = $tagItem['name'];
            }
            $keywords = empty($keyword) ? $article->title : join(",",$keyword);

            return view('article.article',[
                'title' => $article->title,
                'description' => $description,
                'keywords' => $keywords,
                'csrf_token' => $token,
                'article' => $article,
                'comment' => $comment,
                'comment_count' => $comment_count == 0 ? '暂无评论' : $comment_count." 条评论",
                'classify' => $classify,
                'tag' => $tag,
            ]);

        } else {

        }
    }

    /**
     * 添加评论
     */
    public function addComment(Request $request) {

        if (empty($request->input('name'))) {
            return response()->json(['error' => 2, 'message' => '用户名不能为空!']);
        }

        if (strlen($request->input('name')) > 255){
            return response()->json(['error' => 2, 'message' => '用户名长度最大不能超过 255 个字符!']);
        }

        if (!empty($request->input('email'))) {
            if (strlen($request->input('email')) > 255){
                return response()->json(['error' => 2, 'message' => '邮箱长度最大不能超过 255 个字符!']);
            }
            if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $request->input('email'))){
                return response()->json(['error' => 2, 'message' => '请填写正确的邮箱名!']);
            }

            $email = $request->input('email');
            $photo = "https://www.gravatar.com/avatar/" . md5(strtolower(trim( $email ))) . "?d=" . 'identicon';
        } else {
            $photo = "/public/profile_photo.png";
        }

        if (!empty($request->input('url'))) {
            if (strlen($request->input('url')) > 255){
                return response()->json(['error' => 2, 'message' => '网址长度最大不能超过 255 个字符!']);
            }
            if (!preg_match("/https?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/is", $request->input('url'))){
                return response()->json(['error' => 2, 'message' => '请填写正确的网址!']);
            }
        }


        if (empty($request->input('content'))){
            return response()->json(['error' => 2, 'message' => '评论内容不能为空!']);
        }


        $data = new Comment;

        $results = ['error' => 0, 'message' => '创建成功!'];

        $data->article_id = $request->input('article_id');
        $data->comment_id = $request->input('comment_id', 0);
        $data->name = $request->input('name');
        $data->email = $request->input('email', '');// alvin
        $data->url = $request->input('url', '');
        $data->content = $request->input('content');
        $data->state = $request->input('state', 1);
        $data->photo = $photo;
        $data->ip = $_SERVER["REMOTE_ADDR"];

        $data->save();

        $results['info'] = $data->toArray();

        return response()->json($results);
    }
    /**
     * 点赞文章
     */
    public function articleFavor(Request $request, $id) {

        if (isset($id)) {

            $data = Article::find($id);

            $data->favor = $data->favor + 1;

            $data->save();

            $results['info'] = $data->toArray();

            return response()->json($results);
        }
    }
    /**
     * 点赞评论
     */
    public function commentFavor(Request $request, $id) {

        if (isset($id)) {

            $data = Comment::find($id);

            $data->favor = $data->favor + 1;

            $data->save();

            $results['info'] = $data->toArray();

            return response()->json($results);
        }
    }

    /**
     * 分类列表
     */
    public function classifyList(Request $request) {

        $token = $request->session()->get('_token');

        $classify = Classify::where('type', 0)->orderBy('updated_at', 'asc')->select('id', 'name', 'slug')->get()->toArray();

        $list = [];
        foreach ($classify as $item) {
            $item['article_count'] = Article::where('classify_id', $item['id'])->count();
            $list[] = $item;
        }



        return view('article.classify',[
            'title' => '你爱谁如鲸向海 - 分类列表',
            'description' => '你爱谁如鲸向海的网络日志。',
            'keywords' => '你爱谁如鲸向海,博客,分类列表',
            'csrf_token' => $token,
            'classify' => $list,
        ]);
    }
    public function classify(Request $request, $id) {

        $token = $request->session()->get('_token');

        $articles = Article::where('classify_id', $id)->orderBy('created_at', 'asc')->limit(10)->select('id', 'title', 'classify_id', 'author', 'media', 'abstract', 'favor', 'year', 'created_at');

        $count = $articles->count();



        $list = $articles->get();


        return view('article.list',[
            'title' => '你爱谁如鲸向海 - 日志列表',
            'description' => '你爱谁如鲸向海的网络日志。',
            'keywords' => '你爱谁如鲸向海,博客,日志列表',
            'csrf_token' => $token,
            'subhead' => '日志列表',
            'count' => $count,
            'list' => $list,
        ]);
    }
}
