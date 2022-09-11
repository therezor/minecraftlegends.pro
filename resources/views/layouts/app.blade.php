<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    @vite('resources/css/app.scss')
</head>
<body class="bg-surface-secondary">
    @yield('body')

    @vite('resources/js/app.js')
    @livewireScripts
</body>
</html>
