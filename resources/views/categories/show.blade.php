@extends('layouts.app')

@section('body')
    @include('sections.header')

    <div class="py-5 container-xl">
        <div class="row g-5">
            <main class="col-md-8">
                <h1 class="mb-3">
                    {{ $category->name }}
                </h1>

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

                    <div class="card-footer border-top">
                        <div class="row">
                            <div class="col-auto">
                                <a class="btn btn-sm btn-neutral" href="#" title="Comments">
                                    <i class="bi bi-chat-left-dots"></i> 10
                                </a>
                            </div>
                            <div class="col text-end">
                                <a class="btn btn-sm btn-neutral" href="#" title="Share">
                                    <i class="bi bi-box-arrow-up-right"></i> Share
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </main>
            <aside class="col-md-4">
                @include('sections.sidebar')
            </aside>
        </div>
    </div>

    @include('sections.footer')
@endsection
