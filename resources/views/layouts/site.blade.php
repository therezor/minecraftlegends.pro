<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {!! SEO::generate() !!}

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png}">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">

    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/site.css') }}">
</head>
<body>
@yield('header')

<main class="container">
    @yield('container')
</main>

<footer id="footer" class="container">
    <hr>
    <small>Built with <a href="https://picocss.com">Pico</a> • <a href="https://github.com/picocss/examples/blob/master/preview/index.html">Source code</a></small>
</footer>
</body>
</html>
