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
    <link type="text/css" rel="stylesheet" href="http://mui.xuehtml.com/src/css/font-awesome.min.css">
    <link type="text/css" rel="stylesheet" href="http://mui.xuehtml.com/src/css/simple-line-icons.css">
    <link type="text/css" rel="stylesheet" href="/public/css/style.min.css">
    <title>{{ $title }}1</title>

    <!-- Scripts -->
    <script>
        window.csrf_token = "{{ $csrf_token }}";
    </script>

</head>

<body>
    <div id="webApplication"></div>

    <!-- JavaScript -->
    <script type="text/javascript" src="/public/js/bundle.js"></script>
</body>

</html>
