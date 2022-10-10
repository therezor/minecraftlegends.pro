<div class="d-flex flex-row gap-3">
    <div class="position-relative">
        <a href="#filters" class="btn btn-sm btn-neutral" data-bs-toggle="collapse" role="button">
            <i class="bi bi-funnel me-2"></i>
            {{ trans('crud.filters') }}
        </a>
        @if($filterForm->getFieldValues(false))
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{ count($filterForm->getFieldValues(false)) }}</span>
        @endif
    </div>
    @if($filterForm->getFieldValues(false))
        <a href="{{ url()->current() }}" class="btn btn-sm btn-neutral text-danger">
            <i class="bi bi-x-lg"></i>
        </a>
    @endif
</div>

<div id="filters" class="panel-collapse collapse">
    {!! form_start($filterForm) !!}
    <div class="d-flex flex-column flex-md-row gap-3 mt-4">
        {!! form_rest($filterForm) !!}
    </div>

    <div class="text-end">
        <button type="submit" class="btn btn-primary btn-sm">{{ trans('crud.filter') }}</button>
    </div>

    {!! form_end($filterForm) !!}
</div>
