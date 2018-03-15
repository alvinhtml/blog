<?php

namespace App\Http\Controllers;

use App\Classify;
use Illuminate\Http\Request;

class ClassifyController extends Controller
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
            $classify = new Classify;
            $classify = Classify::where('type', 0);
        } else {
            $classify = Classify::where('type', 0)
                ->orWhere('name', 'like', '%'.$search.'%')
                ->orWhere('slug', 'like', '%'.$search.'%');
        }

        //取出总条数
        $count = $classify->count();

        //页码不能超过最大页码
        $page = min($page, ceil($count / $limit));

        //limit offset
        $offset = $page == 1 ? 0 : ($page - 1) * $limit;

        //排序
        if (empty($order)) {
            $datalist = $classify
            ->offset($offset)
            ->limit($limit);
        } else {
            $datalist = $classify
                ->offset($offset)
                ->limit($limit)
                ->orderBy($order[0], $order[1]);
        }

        $list = $datalist->select('id', 'name', 'slug', 'type', 'created_at')->get();

        //echo '<pre>';
        // var_dump($list);
        // die;

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
    public function form(Request $request, $id = null) {
        if (isset($id)) {
            $data = Classify::find($id);
            $results = ['error' => 0, 'message' => '更新成功!'];
        } else {
            $data = new Classify;
            $results = ['error' => 0, 'message' => '创建成功!'];
        }

        $data->name = $request->input('name');
        $data->slug = $request->input('slug');
        $data->type = $request->input('type');
        $data->save();


        $results['info'] = $data->toArray();

        return response()->json($results);
    }
    public function del(Request $request, $id) {
        $idArray = explode(',', $id);
        Classify::destroy($idArray);

        $results = ['error' => 0, 'message' => '删除成功!'];
        $results['ids'] = $idArray;

        return response()->json($results);
    }

    public function info(Request $request, $id) {
        //查询数据库中是否已经存了对应的配置
        $datalist = Classify::where('id', $id)
            ->get();

        $results = ['error' => 0, 'message' => '获取用户信息成功!'];

        $results['info'] = $datalist->first();

        return response()->json($results);
    }

}
