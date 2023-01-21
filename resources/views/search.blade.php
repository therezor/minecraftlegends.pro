@extends('layouts.public')

@section('container')
    <div class="bg-body-light">
        <div class="content content-full">
            <div class="py-3 text-center">
                <h1 class="h3 fw-bold mb-2">
                    {{ __('Search result') }}
                </h1>
            </div>
        </div>
    </div>

    <div class="content content-boxed">
        {{ Form::open(['method' => 'get', 'route' => 'search', 'class' => 'mb-4']) }}
        {{ Form::search('term', $term, ['class' => 'form-control form-control', 'placeholder' => __('Search...')]) }}
        {{ Form::close() }}

        <div class="block block-rounded">
            <div class="block-content">
                @forelse($posts as $post)

                            <h4 class="h5 mb-1">
                                <a href="{{ route('posts.show', $post->slug) }}">{{ $post->title }}</a>
                            </h4>
                            <div class="fs-sm fw-medium text-success mb-1">{{ route('posts.show', $post->slug) }}</div>
                            <p class="fs-sm text-muted">{{ $post->description }}</p>

                @empty
                    <div class="alert alert-warning" role="alert">
                        {{ __('Nothing found') }}
                    </div>
                @endforelse

                {{ $posts->links() }}
            </div>
        </div>

    </div>
@endsection
