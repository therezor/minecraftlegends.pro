@extends('layouts.site')

@section('container')
    @include('site.sections.menubar', ['back' => route('site.index'), 'heading' => trans('site.blog')])

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

        {{ $posts->links() }}
    </div>
@endsection
