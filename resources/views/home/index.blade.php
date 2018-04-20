@extends('common.layout')

@section('content')

    <div class="main-box clear">
    	<div class="content">
            <section class="section">
                <h3 class="section-head"><a href="">{{ $article['title'] }}</a></h3>
                <p>{{ $article['abstract'] }}</p>
                <p><a href="/article/id/{{ $article['id'] }}">继续阅读全文</a></p>
            </section>
            <section class="section">
                <h3 class="section-head">最新文章</h3>
                <ul class="article-list">
@foreach ($list as $item)
                    <li><span>{{ $item['created_at'] }} » </span><a href="/article/id/{{ $item['id'] }}">{{ $item['title'] }}</a></li>
@endforeach
                </ul>
                <p><a href="/article/list">查看更多文章</a></p>
            </section>
    	</div>

        <div class="side-bar">
        	<div class="bar-box">
        		<h3 class="bar-head">Me</h3>
        		<div class="me-bg"><img src="/public/images/banner.jpg"></div>
        		<div class="me-body">
        			<div class="me-author-img"><img src="/public/images/photo.jpg"></div>
        			<div class="me-author-bio">
        				<h3>你爱谁如鲸向海</h3>
        				<div class="muted">生当如夏花 只为绚烂一瞬</div>
        			</div>
        		</div>
        	</div>

    		<div class="bar-box">
        		<h3 class="bar-head">分类目录</h3>
                <div class="bar-content">
            		<ul class="side-list">
@foreach ($classify as $item)
                        <li><span><a href="">{{ $item['name'] }} (3)</a></li>
@endforeach
                    </ul>
                </div>
        	</div>
        </div>
    </div>

@stop
