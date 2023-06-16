<article class="py-6 sm:flex group">
    <div class="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44 sm:h-auto">
        <a href="{{ route('path', $post->path) }}">
            <img class="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80" alt="Image Description">
        </a>
    </div>

    <div class="grow mt-4 sm:mt-0 sm:ml-6 px-4 sm:px-0">
        <a href="{{ route('path', $post->category->path) }}" class="inline-flex text-sm font-medium mr-2 px-2.5 py-0.5 rounded text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 mb-5">
            {{ $post->category->name }}
        </a>

        <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
            <a href="{{ route('path', $post->path) }}">
                {{ $post->title  }}
            </a>
        </h2>
        <p class="mb-5 text-gray-500 dark:text-gray-400">
            {{ $post->description }}
        </p>
        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-500">
                                <time datetime="{{ $post->updated_at->timestamp }}">{{ $post->updated_at->diffForHumans() }}</time>
                            </span>
            <a href="{{ route('path', $post->path) }}" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                {{ __('Read more') }}
                <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>
</article>
