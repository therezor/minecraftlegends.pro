<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', config('app.name'))</title>

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png}">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body class="bg-surface-secondary">

<div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
    @include('panel.sections.sidebar')

    <div class="h-screen flex-grow-1 overflow-y-lg-auto">
        <header class="py-6">
            <div class="container-fluid">
                <div class="mb-npx">
                    <div class="row align-items-center">
                        <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                            @yield('header')
                        </div>

                        <div class="col-sm-6 col-12 text-sm-end">
                            @stack('actions')
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <main class="pb-6 bg-surface-secondary">
            <div class="container">
                @include('sections.messages')
                @yield('content')
            </div>
        </main>
    </div>
</div>

<script defer src="{{ mix('js/html-editor.js') }}"></script>

@stack('scripts')

</body>
</html>
