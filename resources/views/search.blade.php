@extends('layouts.app')

@section('body')
    @include('sections.header')

    <div class="py-5 container-xl">
        <div class="row g-5">
            <main class="col-md-8">
                <h1 class="mb-3">
                    {{ __('Search result') }}

                    @if($term)
                        <small class="text-muted text-sm">{{ $term }}</small>
                    @endif
                </h1>

                @forelse($posts as $post)
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
                @empty
                    <div class="alert alert-warning" role="alert">
                        {{ __('Nothing found') }}
                    </div>
                @endforelse

                {{ $posts->links() }}
            </main>
            <aside class="col-md-4">
                @include('sections.sidebar')
            </aside>
        </div>
    </div>

    @include('sections.footer')
@endsection
