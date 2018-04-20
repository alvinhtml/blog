@extends('common.layout')

@section('content')

    <div class="main-box clear">
        <section class="section">
            <h3 class="section-head">日志列表</h3>
            <ul class="article-list">
@foreach ($list as $item)
                <li><span>{{ $item->created_at }} » </span><a href="/article/id/{{ $item['id'] }}">{{ $item->title }}</a></li>
@endforeach
            </ul>
        </section>
    </div>

@stop
