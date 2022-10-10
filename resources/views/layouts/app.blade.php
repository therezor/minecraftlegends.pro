<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/bootstrap-icons.css') }}">
</head>
<body class="bg-surface-secondary">
    @yield('body')

    <script defer src="{{ mix('js/app.js') }}"></script>
</body>
</html>
