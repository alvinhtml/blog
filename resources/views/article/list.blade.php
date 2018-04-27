@extends('common.layout')

@section('content')

    <div class="main-box clear">
        <section class="section">
            <h3 class="section-head">{{ $subhead }}</h3>
            <ul class="article-list">
@foreach ($list as $item)
                <li><span>{{ Date('Y年m月d日', strtotime($item->created_at)) }} » </span><a href="/article/id/{{ $item['id'] }}">{{ $item->title }}</a></li>
@endforeach
            </ul>
        </section>
    </div>

@stop
