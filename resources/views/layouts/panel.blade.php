<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', config('app.name'))</title>

    @vite('resources/css/app.scss')
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
            <div class="container-fluid">
                @yield('content')
            </div>
        </main>
    </div>
</div>

@vite('resources/js/app.js')
</body>
</html>
