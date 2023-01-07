@extends('layouts.public')

@section('container')
    @if($posts->currentPage() === 1)
        <div class="bg-body-extra-light">
            <div class="content content-full">
                <div class="row g-0 justify-content-center text-center">
                    <div class="col-md-10 py-5">
                        <h1 class="fs-2 fw-bold mb-3">
                            {{ __('Minecraft legends Pro') }}
                        </h1>
                        <p class="fs-5 fw-medium text-muted mb-4 mx-xl-8">
                            {{ __('Welcome to the MinecraftLegends fan club! Here, you will be able to track the latest news and modifications, download mods, share your experience with others, and offer helpful advice to new users.') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        @if($editorChoice->isNotEmpty())
            <div class="bg-body-dark">
                <div class="content content-boxed">

                    <h2 class="content-heading">{{ __('Editor choice') }}</h2>

                    <div class="row">
                        @foreach($editorChoice as $post)
                            @include('posts.sections.card')
                        @endforeach
                    </div>
                </div>
            </div>
        @endif
    @endif

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

        @if($featured->isNotEmpty())
            <h2 class="content-heading">{{ __('Featured') }}</h2>

            <div class="row">
                @foreach($featured as $post)
                    @include('posts.sections.card')
                @endforeach
            </div>
        @endif
    </div>
@endsection
