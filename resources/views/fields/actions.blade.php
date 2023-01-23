<button class="btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa fa-fw fa-ellipsis"></i>
</button>
<div class="dropdown-menu fs-sm">
    @if($field->hasAction('show') && Route::has($field->getRoutePrefix() . '.show'))
        <a href="{{ route($field->getRoutePrefix() . '.show', $value) }}" title="{{ trans('crud.show') }}" class="dropdown-item fs-sm fw-medium">
            <i class="fa fa-fw fa-eye"></i> {{ trans('crud.show') }}
        </a>
    @endif

    @if($field->hasAction('edit') && Route::has($field->getRoutePrefix() . '.edit'))
        <a href="{{ route($field->getRoutePrefix() . '.edit', $value) }}" title="{{ trans('crud.edit') }}" class="dropdown-item fs-sm fw-medium">
            <i class="fa fa-fw fa-pencil-alt"></i> {{ trans('crud.edit') }}
        </a>
    @endif

    @if($field->hasAction('destroy') && Route::has($field->getRoutePrefix() . '.destroy'))
        <a href="{{ route($field->getRoutePrefix() . '.destroy', $value) }}" data-confirm-message="{{ trans('crud.confirmation') }}" title="{{ trans('crud.destroy') }}" data-method="delete" class="dropdown-item fs-sm fw-medium">
            <i class="fa fa-fw fa-trash"></i> {{ trans('crud.destroy') }}
        </a>
    @endif
</div>

