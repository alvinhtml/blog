<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'classify_id', 'author', 'media', 'abstract', 'content', 'markdown', 'favor', 'year', 'month', 'day', 'state'
    ];
}
