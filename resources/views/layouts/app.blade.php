<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    {!! SEOMeta::generate() !!}
    {!! OpenGraph::generate() !!}
    {!! Twitter::generate() !!}

{{--    <meta name="description" content="@yield('description')">--}}
{{--    <meta property="og:type" content="website">--}}
{{--    <meta property="og:site_name" content="{{ config('app.name') }}">--}}
{{--    <meta property="og:title" content="@yield('og_title')">--}}
{{--    <meta property="og:description" content="@yield('og_description')">--}}
{{--    <meta property="og:url" content="{{ url()->current() }}">--}}
{{--    <meta property="og:image" content="@yield('og_image_url', asset('img/og-image.jpg'))">--}}

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png}">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">

    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/bootstrap-icons.css') }}">
</head>
<body class="bg-surface-secondary">
    @yield('body')

    <script defer src="{{ mix('js/app.js') }}"></script>
</body>
</html>
