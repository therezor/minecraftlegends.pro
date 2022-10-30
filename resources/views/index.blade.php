@extends('layouts.app')

@section('body')
    @include('sections.header')
    @if($posts->currentPage() === 1)
        <div class="py-10 py-md-24 bg-dark">
            <div class="container-xl max-w-screen-xl">
                <div class="row justify-content-md-center">
                    <div class="col-md-10 col-xl-8 text-md-center">
                        <div>
                            <h1 class="ls-tight font-bolder display-3 text-white mb-7">
                                Minecraft legends Pro
                            </h1>
                            <p class="lead text-white text-opacity-75 mb-10">
                                With an intuitive markup, powerful and lightning fast build tools, Clever has everything you need to turn your ideas into incredible products.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif
    <div class="py-5 container-xl">
        <div class="row g-5">
            <main class="col-md-8">
                @foreach($posts as $post)
                    <div class="card mb-5">
                        @if($post->image_id)
                            <a href="{{ route('posts.show', $post->slug) }}" class="ratio ratio-16x9">
                                <img class="card-img-top" loading="lazy" src="{{ imageUrl($post->image_id) }}" alt="{{ $post->title }}">
                            </a>
                        @endif

                    <div class="card-body">
                        <a href="{{ route('posts.show', $post->slug) }}">
                            <h2 class="text-primary-hover">{{ $post->title }}</h2>
                        </a>
                        <p>{{ $post->description }}</p>
                    </div>
                </div>
                @endforeach
                {{ $posts->links() }}
            </main>
            <aside class="col-md-4">
                @include('sections.sidebar')
            </aside>
        </div>
    </div>

    @include('sections.footer')
@endsection
