@extends('layouts.app')

@section('body')
    @include('sections.header')

    <div class="py-5 container-xl">
        <div class="row g-5">
            <main class="col-md-8">
                <div class="card mb-5">
                    <div class="card-body">
                        @if(!$post->per_page || $blocks->currentPage() === 1)
                            @if($post->image_id)
                                <img class="card-img mb-4" src="{{ imageUrl($post->image_id) }}" alt="{{ $post->title }}">
                            @endif

                            <h1 class="mb-4">{{ $post->title }}</h1>

                            <p class="mb-4">{{ $post->description }}</p>
                        @endif

                        @foreach($blocks as $block)
                            @include('posts.blocks.' . $block->type->value)
                        @endforeach

                        @if($post->per_page)
                            {{ $blocks->links('posts.sections.pagination') }}
                        @endif
                    </div>
                </div>
            </main>
            <aside class="col-md-4">
                @include('posts.sections.sidebar')
            </aside>
        </div>
    </div>

    @include('sections.footer')
@endsection
