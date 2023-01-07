<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>

    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body>
    <div id="page-container">
        <main id="main-container">
            <div class="hero">
                <div class="hero-inner text-center">
                    <div class="bg-body-extra-light">
                        <div class="content content-full overflow-hidden">
                            <div class="py-4">
                                <h1 class="display-1 fw-bolder @yield('code-class', 'text-primary')">
                                    @yield('code')
                                </h1>
                                <h2 class="h3 fw-normal mb-3">
                                    @yield('title')
                                </h2>
                                <p class="h6 fw-normal text-muted mb-3">
                                    @yield('message')
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="content content-full text-muted fs-sm fw-medium">
                        <a class="link-fx" href="javascript:location.reload();">{{ __('Refresh') }}</a>
                            {{ __('or') }}
                        <a class="link-fx" href="{{ route('index') }}">{{ __('Back to Homepage') }}</a>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
