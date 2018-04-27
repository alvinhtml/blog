@extends('common.layout')

@section('content')

    <div class="main-box clear">
        <section class="section">
            <h3 class="section-head">分类列表</h3>
            <ul class="article-list">
@foreach ($classify as $item)
                <li><a href="/classify/{{ $item['id'] }}">{{ $item['name'] }} ({{ $item['article_count'] }})</a></li>
@endforeach
            </ul>
        </section>
    </div>

@stop
