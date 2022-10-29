@if ($paginator->hasPages())
    <div class="row g-3 align-items-center">
        <div class="col-4">
            @if ($paginator->onFirstPage())
                <span class="btn d-block btn-secondary disabled" aria-disabled="true">
                    @lang('pagination.previous')
                </span>
            @else
                <a class="btn d-block btn-secondary" href="{{ $paginator->previousPageUrl() }}" rel="prev">
                    @lang('pagination.previous')
                </a>
            @endif
        </div>
        <div class="col-4 text-muted text-center">
            {!! __('Page') !!} {{ $paginator->currentPage() }} {{ __('of') }} {{ $paginator->lastPage() }}
        </div>
        <div class="col-4">
            @if ($paginator->hasMorePages())
                <a class="btn d-block btn-primary" href="{{ $paginator->nextPageUrl() }}" rel="prev">
                    @lang('pagination.next')
                </a>
            @else
                <span class="btn d-block btn-primary disabled" aria-disabled="true">
                    @lang('pagination.next')
                </span>
            @endif
        </div>
    </div>
@endif
