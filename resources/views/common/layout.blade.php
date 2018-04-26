<!DOCTYPE html>
<!--
    @ Chrome    43+
    @ Firefox   40+
    @ Opera     31+
    @ Android   44+
    @ Chrome for Android    44+
-->
<html>

<head>
    <meta charset="utf-8">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ $csrf_token }}">

    <link rel="shortcut icon" href="/public/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- External CSS -->
    <link type="text/css" rel="stylesheet" href="http://mui.xuehtml.com/src/css/miniui.min.css">
    <link type="text/css" rel="stylesheet" href="/public/css/index.min.css">
    <link type="text/css" rel="stylesheet" href="/public/css/simple-line-icons.min.css">
    <title>{{ $title }}</title>
    <script>
        var deviceWidth = parseInt(window.screen.width);  //获取当前设备的屏幕宽度
        var deviceScale = deviceWidth / 640;  //得到当前设备屏幕与640之间的比例，之后我们就可以将网页宽度固定为640px
        var ua = navigator.userAgent;
        //获取当前设备类型（安卓或苹果）
        if (/Android (\d+\.\d+)/.test(ua)) {
        var version = parseFloat(RegExp.$1);
        if (version > 2.3) {
            document.write('<meta name="viewport" content="width=640,initial-scale=' + deviceScale + ', minimum-scale = ' + deviceScale + ', maximum-scale = ' + deviceScale + ', target-densitydpi=device-dpi">');
        } else {
            document.write('<meta name="viewport" content="width=640,initial-scale=0.75,maximum-scale=0.75,minimum-scale=0.75,target-densitydpi=device-dpi" />');
        }
        } else {
            document.write('<meta name="viewport" content="width=640, user-scalable=no">');
        }
    </script>

    <!-- Scripts -->
    <script>
        window.csrf_token = "{{ $csrf_token }}";
    </script>
</head>

<body>
    <header class="header" style="background-image:url(/public/images/background.jpg)">

        <!--logo-->
    	<div class="site-logo" data-music="">
    		<a href="http://www.alvinhtml.com/" rel="home"><img src="/public/images/photo.jpg"></a>
    	</div>

        <!--title-->
    	<div class="site-title">你爱谁如鲸向海</div>

        <!--description-->
    	<div class="site-description">生当如夏花 只为绚烂一瞬</div>
    </header>

    <div class="header-menu">
        <ul class="site-menu clear">
            <li><a href="/">首页</a></li>
            <li><a href="/article/list">日志</a></li>
            <li><a href="/">笔记</a></li>
            <li><a href="/">关于博主</a></li>
        </ul>
    </div>

    @yield('content')

    <footer class="footer">
        <div class="footer-info">
            <a href="http://www.alvinhtml.com"><img src="/public/images/photo.jpg"></a>
            <div class="fname">你爱谁如鲸向海</div>
            <div class="finfo">脚步无法到达的地方,目光可以到达;目光无法到达的地方,梦想可以到达。</div>
            <div class="Copyright">© 2018 你爱谁如鲸向海</div>
        </div>
    </footer>
    <script type="text/javascript" src="/public/js/index.js"></script>
</body>
</html>
