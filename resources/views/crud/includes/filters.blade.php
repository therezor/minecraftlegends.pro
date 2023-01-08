<div class="block-options">
    <div class="dropdown">
        <button type="button" class="btn btn-sm btn-alt-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ trans('crud.filters') }}
            @if($filterForm->getFieldValues(false))
                <span class="badge rounded-pill bg-danger">{{ count($filterForm->getFieldValues(false)) }}</span>
            @endif
            <i class="fa fa-angle-down ms-1"></i>
        </button>

        <div class="dropdown-menu dropdown-menu-end dropdown-menu-lg p-3">
            {!! form_start($filterForm) !!}
            {!! form_rest($filterForm) !!}

            <div class="d-grid">
                <button type="submit" class="btn btn-secondary btn-sm">{{ trans('crud.apply') }}</button>
            </div>

            {!! form_end($filterForm) !!}
        </div>

        @if($filterForm->getFieldValues(false))
            <a href="{{ url()->current() }}" class="btn btn-sm btn-alt-danger">
                <i class="fa fa-fw fa-times"></i>
            </a>
        @endif
    </div>
</div>
