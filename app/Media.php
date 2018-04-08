<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    //use Authenticatable, Authorizable;

    public $table = 'medias';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'originalname', 'type', 'path', 'preview', 'desp', 'info'
    ];
}
