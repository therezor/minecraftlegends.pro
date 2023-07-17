<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {!! SEOMeta::generate() !!}
    {!! OpenGraph::generate() !!}
    {!! Twitter::generate() !!}

    <meta name="csrf-token" content="{{ csrf_token() }}">

    @if($favicon = setting('favicon'))
        <link rel="icon" href="{{ Storage::disk('public')->url($favicon) }}">
    @endif

    <link media="all" type="text/css" rel="stylesheet" href="{{ Vite::asset('resources/sass/app.scss', 'front') }}">
</head>
<body class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
    @yield('body')

    <script defer src="{{ Vite::asset('resources/js/app.js', 'front') }}"></script>
    @stack('scripts')
</body>
</html>
