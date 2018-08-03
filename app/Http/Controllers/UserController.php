<?php

namespace App\Http\Controllers;

use App\User;
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
        //$this->middleware('auth', ['except' => 'logout']);
    }


    /**
     * [register description]
     * @param  Request $request [description]
     * @return [type]           [json]
     */
    public function register(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users'
        ]);
        $user = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'photo' => '',
            'password' => app('hash')->make($request->input('password')),
            'type' => 4,
            'state' => 1,
            'remember_token' => str_random(10),
        ];
        User::create($user);

    }

    public function login(Request $request) {

        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        if (empty($user)) {
            $result = ['error' => 100, 'message' => '用户名不存在!'];
            $result['logined'] = false;
            return response()->json($result);
        } else {
            if (app('hash')->check($password, $user->password)) {
                $request->session()->regenerate();
                $request->session()->put('name', $user->name);
                $request->session()->put('email', $user->email);
                $token = $request->session()->get('_token');
                User::where('email', $email)->update(['remember_token' => $token]);
                $result = ['error' => 0, 'message' => '登录成功!'];
                $result['logined'] = true;
                $result['adminname'] = $user->name;
                $result['adminemail'] = $user->email;
                return response()->json($result);
            } else {
                $result = ['error' => 100, 'message' => '您输入的密码错误，请重新输入!'];
                $result['logined'] = false;
                return response()->json($result);
            }
        }
    }

    public function logout(Request $request) {

        $request->session()->flush();

        //返回退出成功后的 json 信息
        $result = ['error' => 0, 'message' => '退出登录成功!'];
        $result['logined'] = false;
        $result['renew_csrf_token'] = 1;
        return response()->json($result);

    }

    public function authinfo(Request $request) {

        $usersession = $request->session()->all();

        $result = ['error' => 0, 'message' => '获取登录信息成功!'];
        $result['logined'] = true;
        $result['adminname'] = $usersession['name'];
        $result['adminemail'] = $usersession['email'];

        return response()->json($result);

    }

    public function list(Request $request) {
        $order_srt = $request->input('order');
        $search = $request->input('search');
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);

        $order = isset($order_srt) ? explode(',', $order_srt) : [];

        //搜索
        if (empty($search)) {
            $user = new User;
        } else {
            $user = User::where('name', 'like', '%'.$search.'%')
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

        $list = $datalist->select('id', 'name', 'photo', 'email', 'type', 'state', 'created_at')->get();

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

    public function form(Request $request,  $id = null) {
        if (isset($id)) {
            $data = User::find($id);
            $results = ['error' => 0, 'message' => '更新成功!'];
        } else {
            $data = new User;
            $data->password = app('hash')->make($request->input('password'));
            $data->remember_token = str_random(10);
            $results = ['error' => 0, 'message' => '创建成功!'];
        }

        $data->name = $request->input('name');
        $data->email = $request->input('email');
        $data->photo = $request->input('photo');
        $data->type = $request->input('type');
        $data->state = $request->input('state');
        $data->save();


        $results['info'] = $data->toArray();

        return response()->json($results);

    }

    public function del(Request $request, $id) {
        $idArray = explode(',', $id);
        User::destroy($idArray);

        $results = ['error' => 0, 'message' => '删除成功!'];
        $results['ids'] = $idArray;

        return response()->json($results);
    }

    public function info(Request $request, $id) {
        //查询数据库中是否已经存了对应的配置
        $datalist = User::where('id', $id)
            ->get();

        $results = ['error' => 0, 'message' => '获取用户信息成功!'];

        $results['info'] = $datalist->first();

        return response()->json($results);
    }



}
