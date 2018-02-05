<?php
// config/session.php
// 这里直接从laravel中copy过来了，并且使用了file驱动，当然你也可以使用其他驱动，详细配置请查阅laravel官方文档
return [
    'driver' => env('SESSION_DRIVER', 'file'),//默认使用file驱动，你可以在.env中配置
    'lifetime' => 120,//缓存失效时间
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => storage_path('framework/session'),//file缓存保存路径
    'connection' => null,
    'table' => 'sessions',
    'lottery' => [2, 100],
    'cookie' => 'laravel_session',
    'path' => '/',
    'domain' => null,
    'secure' => false,
];
