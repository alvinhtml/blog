@extends('common.layout')

@section('content')

    <div class="main-box article-content-box clear">
        <h1 class="article-title">{{ $article->title }}</h1>
        <aside class="entry-aside">
            <span><i class="icon-calendar"></i>{{ $article->created_at }}</span>
            <span class="phone-none"><i class="icon-user"></i>{{ $article->author }}</span>
            <span class="phone-none"><i class="icon-folder"></i><a href="/classify/list/{{ $classify->id }}" rel="category">{{ $classify->name }}</a></span>
            <span class="phone-none"><i class="icon-tag"></i>
@foreach ($tag as $item)
                <a href="/tag/list/{{ $item->id }}" rel="category">{{ $item->name }}</a>
@endforeach
            </span>
            <span><i class="icon-like"></i>{{ $article->favor }} 赞</span>
            <span class="phone-none" ><a href="#commentlist"><i class="icon-bubble"></i>{{ $comment_count }}</a></span>
        </aside>
        <div class="article-content">{!! $article->content !!}</div>

        <div class="article-favor"><span class="button green"><i class="icon-heart"></i> | 24</span></div>

        <div class="article-comment">
            <div class="comment-list" name="commentlist" id="commentlist">
@foreach ($comment as $item)
                <div class="comments">
                    <div class="comments-info">
                        <span class="comments-photo"><img src="{{ $item->photo }}" /></span>
@if (isset($item->belongsToCmment))
                        <span class="comments-name">{{ $item->name }} <span class="color-gray">回复</span> {{$item->belongsToCmment['name']}}</span>
@else
                        <span class="comments-name">{{ $item->name }}</span>
@endif
                        <span class="comments-time">{{ $item->created_at }}</span>
                    </div>
                    <div class="comments-content">
                        {{ $item->content }}
                    </div>
                    <div class="entry-aside">
                        <span><a><i class="icon-like"></i>12</a></span>
                        <span data-id="{{ $item->id }}" data-name="{{ $item->name }}" class="replay-button"><i class="icon-action-undo"></i>回复</span>
                    </div>
                </div>
@endforeach
            </div>
            <div class="comment-form">
                <hr class="comment-hr" />
                <h3 id="commentTitle">发表评论</h3>
                <form class="form" id="commentForm" name="commentForm">
                    <input type="hidden" name="article_id" value="{{ $article->id }}" />
                    <input id="commentId" type="hidden" name="comment_id" value="" />
                    <div class="row control">
                        <label class="input-prepend inline-span4"><input type="text" name="name" placeholder="名称" /><span class="add-on"><i class="icon-user"></i></span></label>
                        <label class="input-prepend inline-span4"><input type="text" name="email" placeholder="邮箱" /><span class="add-on"><i class="icon-envelope"></i></span></label>
                        <label class="input-prepend inline-span4"><input type="text" name="url" placeholder="网址" /><span class="add-on"><i class="icon-globe"></i></span></label>
                    </div>
                    <div class="row control">
                        <textarea class="textarea col-span12" name="content"></textarea>
                    </div>
                    <div class="row control">
                        <span class="button blue" id="submitComment">提交</span>
                        <a id="cancelReplay">&nbsp 取消回复</a>
                         &nbsp;
                        <label><input type="checkbox" name="remember" /> 记住个人信息</label>
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop
