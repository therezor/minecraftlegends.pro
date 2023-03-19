@extends('layouts.site')

@section('container')
    <nav class="container-fluid" role="menubar">
        <ul>
            <li>
                <a href="{{ route('site.blog.index') }}" role="icon" aria-label="Back">
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="38" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                </a>
            </li>
        </ul>
        <ul>
            <li>
                <strong role="heading">
                    Blog
                </strong>
            </li>
        </ul>
        <ul>
            <li>
                <a href="/test" role="icon" aria-label="Share">
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="38" fill="currentColor" viewBox="-8 -8 32 32">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>
                </a>
            </li>
        </ul>
    </nav>
    <!-- Main -->
    <main class="container">
        <article role="article">
            <header class="text-center">
                <hgroup>
                    <h1>{{ $post->title }}</h1>
                    <p>
                        <a href="{{ route('site.blog.index', ['search' => $post->category->name]) }}">{{ $post->category->name }}</a>
                        •
                        <time datetime="{{ $post->updated_at->toW3cString() }}">{{ $post->updated_at->diffForHumans() }}</time>
                        •
                        5 min
                    </p>
                </hgroup>
                <figure>
                    <img src="https://loremflickr.com/640/360" alt="">
                </figure>
            </header>
            @foreach($post->content->blocks() as $block)
                @include('site.blog.blocks.' . $block['type'], ['data' => $block['data']])
            @endforeach
        </article>
    </main>
@endsection
