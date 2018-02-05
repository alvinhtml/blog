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
$router->get('/admin', 'UserController@index');
$router->get('/admin/login', 'UserController@index');
$router->get('/admin/home', 'UserController@index');

$router->get('/admin/user', 'UserController@index');
$router->get('/admin/user/list', 'UserController@index');
$router->get('/admin/user/form/{id}', 'UserController@index');
$router->get('/admin/user/form', 'UserController@index');

$router->get('/admin/article', 'ArticleController@index');
$router->get('/admin/article/list', 'ArticleController@index');
$router->get('/admin/article/form/{id}', 'ArticleController@index');
$router->get('/admin/article/form', 'ArticleController@index');

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

$router->post('/api/admin/login', 'UserController@login');
$router->get('/api/authinfo', ['middleware' => 'auth', 'uses' => 'UserController@authinfo']);

//user
$router->get('/api/user/list', ['middleware' => 'auth', 'uses' => 'UserController@list']);
$router->post('/api/user/form/{id}', ['middleware' => 'auth', 'uses' => 'UserController@form']);
$router->post('/api/user/form', ['middleware' => 'auth', 'uses' => 'UserController@form']);
$router->get('/api/user/del/{id}', ['middleware' => 'auth', 'uses' => 'UserController@del']);
$router->get('/api/user/info/{id}', ['middleware' => 'auth', 'uses' => 'UserController@info']);

//article
$router->get('/api/article/list', ['middleware' => 'auth', 'uses' => 'ArticleController@list']);
$router->get('/api/article/update', ['middleware' => 'auth', 'uses' => 'ArticleController@update']);
$router->get('/api/article/info', ['middleware' => 'auth', 'uses' => 'ArticleController@info']);

//classify
$router->get('/api/classify/list', ['middleware' => 'auth', 'uses' => 'ClassifyController@list']);
$router->get('/api/classify/update', ['middleware' => 'auth', 'uses' => 'ClassifyController@update']);
$router->get('/api/classify/info', ['middleware' => 'auth', 'uses' => 'ClassifyController@info']);

//media
$router->get('/api/media/list', ['middleware' => 'auth', 'uses' => 'MediaController@list']);
$router->get('/api/media/upload', ['middleware' => 'auth', 'uses' => 'MediaController@upload']);
$router->get('/api/media/info', ['middleware' => 'auth', 'uses' => 'MediaController@info']);




//$router->get('/admin', ['middleware' => 'auth', 'uses' => 'UserController@index']);
