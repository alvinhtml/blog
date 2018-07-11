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
        'title', 'classify_id', 'author', 'media', 'abstract', 'content', 'editmode', 'favor', 'year', 'month', 'day', 'state'
    ];

    public function tags()
    {
        return $this->belongsToMany('App\Classify', 'article_classify', 'article_id', 'classify_id');
    }

    public function classify()
    {
        return $this->belongsTo('App\Classify', 'classify_id');
    }
}
