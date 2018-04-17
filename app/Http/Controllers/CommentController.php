<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function list(Request $request) {

        $order_srt = $request->input('order');
        $search = $request->input('search');
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);

        $order = isset($order_srt) ? explode(',', $order_srt) : [];

        //搜索
        if (empty($search)) {
            $user = new Comment;
        } else {
            $user = Comment::where('name', 'like', '%'.$search.'%')
                ->orWhere('url', 'like', '%'.$search.'%')
                ->orWhere('email', 'like', '%'.$search.'%');
        }

        //取出总条数
        $count = $user->count();

        //页码不能超过最大页码
        $page = min($page, ceil($count / $limit));

        //limit offset
        $offset = $page == 1 ? 0 : ($page - 1) * $limit;

        //排序
        if (empty($order)) {
            $datalist = $user
            ->offset($offset)
            ->limit($limit);
        } else {
            $datalist = $user
                ->offset($offset)
                ->limit($limit)
                ->orderBy($order[0], $order[1]);
        }

        $list = $datalist->get();
        //
        // $list = [];
        // $datalist->each(function ($item) use (&$list) {
        //     $list[] = array_merge($item->toArray(), [
        //         'tags'=> $item->tags->toArray(),
        //         'classify'=>$item->classify->name,
        //     ]);
        // });

        //开始返回数据
        $result = ['error' => 0, 'message' => '获取用户列表信息成功!'];
        $configs = [];
        $configs['page'] = $page;
        $configs['limit'] = $limit;
        $configs['search'] = $search;
        $configs['order'] = $order;
        $results['configs'] = $configs;
        $results['list'] = $list;
        $results['count'] = $count;

        return response()->json($results);
    }

    public function form(Request $request,  $id = null) {
        if (isset($id)) {
            $data = Comment::find($id);
        } else {
            $data = new Comment;
        }

        $results = ['error' => 0, 'message' => '创建成功!'];

        $data->article_id = $request->input('article_id');
        $data->name = $request->input('name');
        $data->email = $request->input('email', '');// alvin
        $data->url = $request->input('url');
        $data->content = $request->input('content');
        $data->state = $request->input('state', 1);
        $data->photo = '';
        $data->ip = $_SERVER["REMOTE_ADDR"];

        $data->save();

        $results['info'] = $data->toArray();

        return response()->json($results);

    }

    public function del(Request $request, $id) {
        $idArray = explode(',', $id);
        Comment::destroy($idArray);

        $results = ['error' => 0, 'message' => '删除成功!'];
        $results['ids'] = $idArray;

        return response()->json($results);
    }

    public function info(Request $request, $id) {
        //查询数据库中是否已经存了对应的配置
        $datalist = Comment::where('id', $id)
            ->get();

        $results = ['error' => 0, 'message' => '获取用户信息成功!'];

        $results['info'] = $datalist->first();

        return response()->json($results);
    }

    public function viewList(Request $request) {

    }
    public function viewInfo(Request $request) {

    }



}
