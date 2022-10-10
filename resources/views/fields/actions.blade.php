@if($field->hasAction('show') && Route::has($field->getRoutePrefix() . '.show'))
    <a href="{{ route($field->getRoutePrefix() . '.show', $value) }}" data-bs-toggle="tooltip" data-bs-placement="top" title="{{ trans('crud.show') }}" class="btn btn-sm btn-square btn-neutral text-info">
        <i class="bi bi-eye"></i>
    </a>
@endif

@if($field->hasAction('show') && Route::has($field->getRoutePrefix() . '.edit'))
    <a href="{{ route($field->getRoutePrefix() . '.edit', $value) }}" data-bs-toggle="tooltip" data-bs-placement="top" title="{{ trans('crud.update') }}" class="btn btn-sm btn-square btn-neutral text-warning">
        <i class="bi bi-pencil"></i>
    </a>
@endif

@if($field->hasAction('destroy') && Route::has($field->getRoutePrefix() . '.destroy'))
    <a href="{{ route($field->getRoutePrefix() . '.destroy', $value) }}" data-confirm-message="{{ trans('crud.confirmation') }}" data-bs-toggle="tooltip" data-bs-placement="top" title="{{ trans('crud.destroy') }}" data-method="delete" class="btn btn-sm btn-square btn-neutral text-danger">
        <i class="bi bi-trash"></i>
    </a>
@endif
