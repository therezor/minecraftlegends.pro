@extends('layouts.public')

@section('container')
    <div class="bg-image" @if($post->image_id) style="background-image: url('{{ imageUrl($post->image_id) }}');" @endif >
        <div class="bg-primary-dark-op">
            <div class="content content-full text-center pt-9 pb-8">
                <h1 class="text-white mb-2">
                    {{ $post->title }}
                </h1>
                <a href="{{ route('categories.show', $post->category->slug) }}" class="badge rounded-pill bg-dark px-3 py-2">
                   {{ $post->category->name }}
                </a>
            </div>
        </div>
    </div>

    <div class="bg-body-extra-light">
        <div class="content content-boxed">
            <div class="row justify-content-center">
                <div class="col-sm-8">
                    <article class="story">
                        <p>{{ $post->description }}</p>

                        @foreach($post->content->blocks() as $block)
                            @include('posts.blocks.' . $block['type'], ['data' => $block['data']])
                        @endforeach
                    </article>

                    <div class="mt-5 d-flex justify-content-between push">
                        @include('posts.sections.vote')

                        @include('posts.sections.share')
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection
