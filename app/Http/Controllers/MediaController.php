<?php

namespace App\Http\Controllers;

use App\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
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
            $media = Media::where('type', 0);
        } else {
            $media = Media::where('type', 0)
                ->where('name', 'like', '%'.$search.'%');
        }

        //取出总条数
        $count = $media->count();

        //页码不能超过最大页码
        $page = min($page, ceil($count / $limit));

        //limit offset
        $offset = $page == 1 ? 0 : ($page - 1) * $limit;

        //排序
        if (empty($order)) {
            $datalist = $media
            ->offset($offset)
            ->limit($limit);
        } else {
            $datalist = $media
                ->offset($offset)
                ->limit($limit)
                ->orderBy($order[0], $order[1]);
        }

        $list = $datalist->select('id', 'name', 'originalname', 'type', 'path', 'preview', 'desp', 'created_at')->get();

        //开始返回数据
        $result = ['error' => 0, 'message' => '获取媒体列表信息成功!'];
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

    public function upload(Request $request) {

        if ($request->file('file')->isValid()) {
            $results = ['error' => 0, 'message' => '文件上传成功!'];

            $requestFile = $request->file('file');

            //获取文件基本信息
            $originalName = $requestFile->getClientOriginalName();
            $type = $requestFile->getMimeType();
            $extension = $requestFile->getClientOriginalExtension();
            $size = $requestFile->getClientSize();

            //保存存文件
            $filePath = 'public/uploads/'.date('Y').'/'.date('m');
            $fileName = 'v1-'.strtolower(str_random(32)).'.'.$extension;
            $file = $requestFile->move($_SERVER['DOCUMENT_ROOT'].$filePath, $fileName);


            //图片存库
            $data = new Media;
            $data->name = $file->getFilename();
            $data->originalname = $originalName;
            $data->type = $type;
            $data->path = $filePath;
            $data->preview = '';
            $data->desp = '';
            $data->info = '';
            $data->save();

            $results['info'] = $data->toArray();
            return response()->json($results);

        } else {
            $results = ['error' => 6, 'message' => '文件上传失败!'];
            $results['info'] = $file->getErrorMessage();
            return response()->json($results);
        }
    }


    public function addtag(Request $request) {
        $data = new Media;
        $results = ['error' => 0, 'message' => '创建成功!'];

        $data->name = $request->input('name');
        $data->slug = '';
        $data->type = 1;
        $data->save();

        $results['info'] = $data->toArray();
        sleep(2);
        return response()->json($results);
    }




    public function del(Request $request, $id) {
        $idArray = explode(',', $id);
        Media::destroy($idArray);

        $results = ['error' => 0, 'message' => '删除成功!'];
        $results['ids'] = $idArray;

        return response()->json($results);
    }

    public function info(Request $request, $id) {
        echo strtolower(str_random(16));

        //查询数据库中是否已经存了对应的配置
        // $datalist = Media::where('id', $id)
        //     ->get();
        //
        // $results = ['error' => 0, 'message' => '获取媒体信息成功!'];
        //
        // $results['info'] = $datalist->first();
        //
        // return response()->json($results);
    }

}
