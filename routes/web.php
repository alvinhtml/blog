<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });

$router->get('/', 'HomeController@index');
$router->get('/logout', 'UserController@logout');



$router->get('/register', 'UserController@register');


/*
|--------------------------------------------------------------------------
| 后台
|--------------------------------------------------------------------------
|
*/


$router->get('/home', 'WebController@index');
$router->get('/article', 'WebController@articles');
$router->get('/article/list', 'WebController@articles');
$router->get('/article/id/{id}', 'WebController@article');
$router->post('/comment/add', 'WebController@addComment');
$router->get('/classify', 'WebController@classifyList');
$router->get('/classify/{id}', 'WebController@classify');
$router->get('/favor/article_id/{id}', 'WebController@articleFavor');
$router->get('/favor/comment_id/{id}', 'WebController@commentFavor');




$router->get('/admin/login', 'HomeController@index');
$router->get('/admin/home', 'HomeController@index');
//
$router->get('/admin/user', 'HomeController@index');
$router->get('/admin/user/list', 'HomeController@index');
$router->get('/admin/user/form/{id}', 'HomeController@index');
$router->get('/admin/user/form', 'HomeController@index');
//
$router->get('/admin/article', 'HomeController@index');
$router->get('/admin/article/list', 'HomeController@index');
$router->get('/admin/article/form/{id}', 'HomeController@index');
$router->get('/admin/article/form', 'HomeController@index');
//
$router->get('/admin/classify', 'HomeController@index');
$router->get('/admin/classify/list', 'HomeController@index');
$router->get('/admin/classify/form/{id}', 'HomeController@index');
$router->get('/admin/classify/form', 'HomeController@index');
//
$router->get('/admin/media', 'HomeController@index');
$router->get('/admin/media/list', 'HomeController@index');
$router->get('/admin/media/upload', 'HomeController@index');
//
$router->get('/admin/comment', 'HomeController@index');
$router->get('/admin/comment/list', 'HomeController@index');
$router->get('/admin/comment/form/{id}', 'HomeController@index');
$router->get('/admin/comment/form', 'HomeController@index');
//
$router->get('/admin/comment/setting', 'HomeController@index');
$router->get('/admin', 'HomeController@index');
$router->get('/admin/{url}', 'HomeController@index');


/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

$router->post('/api/admin/login', 'UserController@login');
$router->get('/api/admin/logout', ['middleware' => 'auth', 'uses' => 'UserController@logout']);
$router->get('/api/authinfo', ['middleware' => 'auth', 'uses' => 'UserController@authinfo']);

//user
$router->get('/api/user/list', ['middleware' => 'auth', 'uses' => 'UserController@list']);
$router->post('/api/user/form/{id}', ['middleware' => 'auth', 'uses' => 'UserController@form']);
$router->post('/api/user/form', ['middleware' => 'auth', 'uses' => 'UserController@form']);
$router->get('/api/user/del/{id}', ['middleware' => 'auth', 'uses' => 'UserController@del']);
$router->get('/api/user/info/{id}', ['middleware' => 'auth', 'uses' => 'UserController@info']);

//article
$router->get('/api/article/list', ['middleware' => 'auth', 'uses' => 'ArticleController@list']);
$router->post('/api/article/form/{id}', ['middleware' => 'auth', 'uses' => 'ArticleController@form']);
$router->post('/api/article/form', ['middleware' => 'auth', 'uses' => 'ArticleController@form']);
$router->get('/api/article/del/{id}', ['middleware' => 'auth', 'uses' => 'ArticleController@del']);
$router->get('/api/article/info/{id}', ['middleware' => 'auth', 'uses' => 'ArticleController@info']);

//classify
$router->get('/api/classify/list', ['middleware' => 'auth', 'uses' => 'ClassifyController@list']);
$router->get('/api/classify/select_list', ['middleware' => 'auth', 'uses' => 'ClassifyController@select_list']);
$router->get('/api/classify/additems_list', ['middleware' => 'auth', 'uses' => 'ClassifyController@additems_list']);
$router->post('/api/classify/addtag', ['middleware' => 'auth', 'uses' => 'ClassifyController@addtag']);
$router->post('/api/classify/form/{id}', ['middleware' => 'auth', 'uses' => 'ClassifyController@form']);
$router->post('/api/classify/form', ['middleware' => 'auth', 'uses' => 'ClassifyController@form']);
$router->get('/api/classify/del/{id}', ['middleware' => 'auth', 'uses' => 'ClassifyController@del']);
$router->get('/api/classify/info/{id}', ['middleware' => 'auth', 'uses' => 'ClassifyController@info']);

//Media
$router->get('/api/media/list', ['middleware' => 'auth', 'uses' => 'MediaController@list']);
$router->post('/api/media/upload', ['middleware' => 'auth', 'uses' => 'MediaController@upload']);
$router->get('/api/media/del/{id}', ['middleware' => 'auth', 'uses' => 'MediaController@del']);
$router->get('/api/media/info/{id}', ['middleware' => 'auth', 'uses' => 'MediaController@info']);


//comment
$router->get('/api/comment/list', ['middleware' => 'auth', 'uses' => 'CommentController@list']);
$router->post('/api/comment/form/{id}', ['middleware' => 'auth', 'uses' => 'CommentController@form']);
$router->post('/api/comment/form', ['middleware' => 'auth', 'uses' => 'CommentController@form']);
$router->get('/api/comment/del/{id}', ['middleware' => 'auth', 'uses' => 'CommentController@del']);
$router->get('/api/comment/info/{id}', ['middleware' => 'auth', 'uses' => 'CommentController@info']);
$router->get('/api/comment/update_state/{id}', ['middleware' => 'auth', 'uses' => 'CommentController@update_state']);



//默认
$router->get('/', 'WebController@index');
