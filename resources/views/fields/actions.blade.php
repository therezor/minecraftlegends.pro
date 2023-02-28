<button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa fa-fw fa-ellipsis"></i>
</button>
<div class="dropdown-menu fs-sm">
    @if($field->hasUrl('show'))
        <a href="{{ $field->url('show', $value) }}" title="{{ trans('crud.show') }}" class="dropdown-item fs-sm fw-medium">
            <i class="fa fa-fw fa-eye"></i> {{ trans('crud.show') }}
        </a>
    @endif

    @if($field->hasUrl('edit'))
        <a href="{{ $field->url('edit', $value) }}" title="{{ trans('crud.edit') }}" class="dropdown-item fs-sm fw-medium">
            <i class="fa fa-fw fa-pencil-alt"></i> {{ trans('crud.edit') }}
        </a>
    @endif

    @if($field->hasUrl('destroy'))
        <a href="{{ $field->url('destroy', $value) }}" data-confirm-message="{{ trans('crud.confirmation') }}" title="{{ trans('crud.destroy') }}" data-method="delete" class="dropdown-item fs-sm fw-medium">
            <i class="fa fa-fw fa-trash"></i> {{ trans('crud.destroy') }}
        </a>
    @endif
</div>

