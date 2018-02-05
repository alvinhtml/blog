<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'photo', 'email', 'type', 'password', 'remember_token'
    ];
}
