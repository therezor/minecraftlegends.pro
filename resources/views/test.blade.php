<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {!! SEO::generate() !!}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png}">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">

    <link media="all" type="text/css" rel="stylesheet" href="{{ mix('css/site.css') }}">
</head>
<body>

<header style="background-color: rgb(156 163 175 / 0.2);">
    <figure class="avatar">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" class="rounded">
    </figure>

    <hgroup class="text-center">
        <h1>Where to play minecraft legends?</h1>
        <p>Consultant</p>
    </hgroup>
</header>

<!-- Main -->
<main class="container">
    <a href="#" role="button" class="link-button">
        <img src="https://loremflickr.com/640/360" alt="">
        Link button
    </a>

    <a href="#" role="button" class="link-button">
        Link button
   </a>

    <a href="#" role="button" class="link-button">
        Link button
    </a>

    <h2 class="heading">Latest posts</h2>
    <div class="grid-2" style="">
        <input type="search" name="search" placeholder="Search" style="border-radius: var(--border-radius);">
        <select name="category">
            <option value="" selected>Category...</option>
            <option>…</option>
        </select>
{{--        <a href="#" class="secondary"--}}
{{--                role="button"--}}
{{--                data-target="modal-example"--}}
{{--                onClick="toggleModal(event)">--}}
{{--            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 16 16">--}}
{{--                <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"></path>--}}
{{--            </svg>--}}
{{--        </a>--}}
    </div>

    <div class="grid-2">
        <a class="post" href="/test-post">
            <figure>
                <img src="https://loremflickr.com/640/360" alt="">
            </figure>
            <header>
                <h3>Blog post title</h3>

                <small>October 25, 2022  • 5 min</small>
            </header>
        </a>

        <a class="post" href="/test-post">
            <figure>
                <img src="/img/image-default.png" alt="">
            </figure>
            <header>
                <h3>Blog post title</h3>

                <small>October 25, 2022  • 5 min</small>
            </header>
        </a>

        <a class="post" href="/test-post">
            <figure>
                <img src="https://loremflickr.com/640/360" alt="">
            </figure>
            <header>
                <h3>Blog post title</h3>

                <small>October 25, 2022  • 5 min</small>
            </header>
        </a>
    </div>
    <nav class="pagination">
        <span role="button" aria-disabled="true" class="secondary outline">@lang('pagination.previous')</span>
        <a href="#" role="button" rel="next" class="secondary">@lang('pagination.next')</a>
    </nav>
    <a href="/test-post" role="button" class="outline link-button">Load more
        <svg class="right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>
    </a>
</main>

<footer id="footer" class="container">
    <hr>
    <small>Built with <a href="https://picocss.com">Pico</a> • <a href="https://github.com/picocss/examples/blob/master/preview/index.html">Source code</a></small>
</footer>
</body>
</html>
