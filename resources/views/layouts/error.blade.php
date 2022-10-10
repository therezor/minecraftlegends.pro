<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>

    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body class="bg-surface-secondary">
    <div class="d-flex align-items-center justify-content-center min-h-screen">
        <div class="text-center">
            <h1 class="display-1 fw-bold">@yield('code')</h1>
            <p class="fs-3">@yield('message')</p>
        </div>
    </div>
</body>
</html>
