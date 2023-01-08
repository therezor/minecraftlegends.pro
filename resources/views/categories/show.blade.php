@extends('layouts.public')

@section('container')
    <div class="bg-body-light">
        <div class="content content-full">
            <div class="py-3 text-center">
                <h1 class="h3 fw-bold mb-2">
                    {{ $category->name }}
                </h1>
            </div>
        </div>
    </div>

    <div class="content content-boxed">
        @foreach($posts as $post)
            <div class="block block-rounded">
                <div class="block-content">
                    <div class="row items-push">
                        @if($post->image_id)
                            <div class="col-md-4 col-lg-5">
                                <a class="img-link img-link-simple"  href="{{ route('posts.show', $post->slug) }}">
                                    <img class="img-fluid rounded" loading="lazy" src="{{ imageUrl($post->image_id) }}" alt="{{ $post->title }}">
                                </a>
                            </div>
                        @endif
                        <div @class(['d-md-flex align-items-center', 'col-md-8 col-lg-7' => $post->image_id])>
                            <div>
                                <h2 class="mb-1 h-4">
                                    <a class="text-dark" href="{{ route('posts.show', $post->slug) }}">{{ $post->title }}</a>
                                </h2>
                                <p class="fs-sm text-muted">
                                    {{ $post->description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach

        {{ $posts->links() }}
    </div>
@endsection
