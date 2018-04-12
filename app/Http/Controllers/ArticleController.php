<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
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
            $user = new Article;
        } else {
            $user = Article::where('title', 'like', '%'.$search.'%')
                ->orWhere('abstract', 'like', '%'.$search.'%');
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

        $datalist = $datalist->get();

        $list = [];
        $datalist->each(function ($item) use (&$list) {
            $list[] = array_merge($item->toArray(), [
                'tags'=> $item->tags->toArray(),
                'classify'=>$item->classify->name,
            ]);
        });

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
            $data = Article::find($id);
        } else {
            $data = new Article;
            $data->year = date('Y');
            $data->month = date('m');
            $data->day = date('d');
            $data->favor = 0;
            $data->state = $request->input('state');
        }

        $results = ['error' => 0, 'message' => '创建成功!'];

        $data->title = $request->input('title');
        $data->classify_id = $request->input('classify_id');
        $data->author = $request->input('author', '');// alvin
        $data->media = $request->input('media');
        $data->abstract = $request->input('abstract', '');
        $data->content = $request->input('content');
        $data->markdown = $request->input('markdown');
        $data->state = $request->input('state', 1);

        $data->save();

        $IdArray = explode(',', $request->input("tags"));
        //sync 方法可以用数组形式的 IDs 插入中间的数据表。任何一个不存在于给定数组的 IDs 将会在中间表内被删除。所以，操作完成之后，只有那些在给定数组内的 IDs 会被保留在中间表中。
        $data->tags()->sync($IdArray);


        $results['info'] = $data->toArray();

        return response()->json($results);

    }

    public function del(Request $request, $id) {
        $idArray = explode(',', $id);
        Article::destroy($idArray);

        $results = ['error' => 0, 'message' => '删除成功!'];
        $results['ids'] = $idArray;

        return response()->json($results);
    }

    public function info(Request $request, $id) {
        //查询数据库中是否已经存了对应的配置
        $datalist = Article::where('id', $id)
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
