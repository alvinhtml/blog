<?php

namespace App\Providers;

use App\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
            $user = [];
            $user['name'] = $request->session()->get('name');
            $user['email'] = $request->session()->get('email');
            if ($user['email']) {
                return $user;
            } else {
                if ( $request->method() == 'POST' ) {
                    if ($request->input('_token')) {
                        $user = User::where('remember_token', $request->input('_token'))->first();
                        return $user;
                    }
                } else {
                    if ( $request->header('X-CSRF-TOKEN') ) {
                        $user = User::where('remember_token', $request->header('X-CSRF-TOKEN'))->first();
                        return $user;
                    }
                }
            }
        });
    }
}
