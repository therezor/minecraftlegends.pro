<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }}</title>

    <link rel="canonical" href="https://minecraftlegends.pro/what-is-minecraft-legends-about">
    <meta name="description" content="Minecraft Legends is an action-pack strategy game set in a globe similar to Minecraft. You will come across many Minecraft mobs as you try to protect your settlements from piglins. If you are looking forward to try out the latest Minecraft experience, her...">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ config('app.name') }}">
    <meta property="og:title" content="What is minecraft legends about?">
    <meta property="og:description" content="Minecraft Legends is an action-pack strategy game set in a globe similar to Minecraft. You will come across many Minecraft mobs as you try to protect your settlements from piglins. If you are looking forward to try out the latest Minecraft experience, here is what you need to know about Minecraft legends release date, gameplay, and more:">
    <meta property="og:url" content="https://minecraftlegends.pro/what-is-minecraft-legends-about">
    <meta property="og:image" content="https://minecraftlegends.pro/storage/uploads/admin/10/2020-08-10-image-6.png">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/bootstrap-icons.css') }}">
</head>
<body class="bg-surface-secondary">
    @yield('body')

    <script defer src="{{ mix('js/app.js') }}"></script>
</body>
</html>
