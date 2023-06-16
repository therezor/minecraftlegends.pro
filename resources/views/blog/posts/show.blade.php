@extends('layouts.default')

@section('content')
    <section class="py-8 px-4 mx-auto w-full max-w-screen-md lg:py-16 lg:px-6">
        <header class="mb-4">
            <h1 class="text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                {{ $post->title }}
            </h1>
            @if($post->description)
                <p class="mt-4 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    {{ $post->description }}
                </p>
            @endif

            <div class="flex items-center justify-between mt-4">
                <a href="{{ route('path', $post->category->path) }}" class="inline-flex text-sm font-medium mr-2 px-2.5 py-0.5 rounded text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                    {{ $post->category->name }}
                </a>

                <span class="text-gray-500">
                    <time datetime="{{ $post->updated_at->timestamp }}">{{ $post->updated_at->diffForHumans() }}</time>
                </span>
            </div>

            @if($post->image)
                <figure class="flex-shrink-0 relative rounded-xl overflow-hidden w-full aspect-video mt-4">
                    <img class="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full object-cover rounded-xl" src="{{ Storage::disk('public')->url($post->image) }}" alt="{{ $post->title }}">
                </figure>
            @endif
        </header>

        <div class="format format-sm sm:format-base lg:format-lg format-primary dark:format-invert">
            @foreach($post->content['blocks'] ?? [] as $block)
                @include('blog.posts.blocks.' . $block['type'], ['data' => $block['data']])
            @endforeach
        </div>

        <nav role="navigation" aria-label="{{ __('Navigation') }}" class="flex my-8 lg:mt-16 font-medium leading-6">
            @if($prev)
                <a href="{{ route('path', $prev->path) }}" rel="prev" class="flex mr-8 text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <span aria-hidden="true" class="mr-2">←</span>
                    {{ Str::limit($prev->title, 65) }}
                </a>
            @endif

            @if($next)
                <a href="{{ route('path', $next->path) }}" rel="next" class="flex ml-auto text-right text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    {{ Str::limit($next->title, 65) }}
                    <span aria-hidden="true" class="ml-2">→</span>
                </a>
            @endif
        </nav>
    </section>
@endsection
