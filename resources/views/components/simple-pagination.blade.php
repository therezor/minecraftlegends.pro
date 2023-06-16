@if ($paginator->hasPages())
    <nav role="navigation" aria-label="Pagination Navigation" class="flex my-8 lg:mt-16 font-medium leading-6">
        {{-- Previous Page Link --}}
        @if (!$paginator->onFirstPage())
            <a href="{{ $paginator->previousPageUrl() }}" rel="prev" class="flex mr-8 text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <span aria-hidden="true" class="mr-2">←</span>
                {!! __('pagination.previous') !!}
            </a>
        @endif

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <a href="{{ $paginator->nextPageUrl() }}" rel="next" class="flex ml-auto text-right text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                {!! __('pagination.next') !!}
                <span aria-hidden="true" class="ml-2">→</span>
            </a>
        @endif
    </nav>
@endif
