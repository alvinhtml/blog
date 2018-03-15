<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classify extends Model
{
    //use Authenticatable, Authorizable;


    public $table = 'classifys';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'slug'
    ];
}
