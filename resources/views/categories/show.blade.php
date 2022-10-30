@extends('layouts.app')

@section('title',  $category->name . (($posts->currentPage() !== 1) ? ' | Page ' . $posts->currentPage() : ''))
@section('description', __('Category') . ' ' . $category->name)

@section('og_title', $category->name)
@section('og_description', __('Category') . ' ' . $category->name)


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
