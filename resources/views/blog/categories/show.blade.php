@extends('layouts.default')

@section('content')
    <section class="py-8 px-4 mx-auto max-w-screen-md lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h1 class="text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                {{ $category->name }}
            </h1>
            @if($category->description)
                <p class="mt-4 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    {{ $category->description }}
                </p>
            @endif
        </div>

        <div class="divide-y divide-gray-200 dark:divide-gray-700">
            @foreach($posts as $post)
                @include('blog.components.post')
            @endforeach
        </div>

        {{ $posts->links('components.simple-pagination') }}
    </section>
@endsection
