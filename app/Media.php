<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    //use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];
}
