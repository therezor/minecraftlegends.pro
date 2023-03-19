@extends('layouts.site')

@section('container')
    <figure class="avatar">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" class="rounded">
    </figure>

    <hgroup class="text-center">
        <h1>Where to play minecraft legends?</h1>
        <p>Consultant</p>
    </hgroup>

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

    <input type="search" name="search" placeholder="Search" style="border-radius: var(--border-radius);">

    <div class="grid-2">
        @foreach($posts as $post)
            <a class="post" href="{{ route('site.blog.show', $post->slug) }}">
                <figure>
                    <img src="https://loremflickr.com/640/360" alt="">
                </figure>
                <header>
                    <h3>{{ $post->title }}</h3>

                    <small>{{ $post->updated_at }}  • 5 min</small>
                </header>
            </a>
        @endforeach
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
@endsection
