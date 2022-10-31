<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {!! SEOMeta::generate() !!}
    {!! OpenGraph::generate() !!}
    {!! Twitter::generate() !!}

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
