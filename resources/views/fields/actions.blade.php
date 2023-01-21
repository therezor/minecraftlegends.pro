@if($field->hasAction('show') && Route::has($field->getRoutePrefix() . '.show'))
    <a href="{{ route($field->getRoutePrefix() . '.show', $value) }}" data-bs-toggle="tooltip" data-bs-placement="top" title="{{ trans('crud.show') }}" class="btn btn-sm btn-alt-info">
        <i class="fa fa-fw fa-eye"></i>
    </a>
@endif

@if($field->hasAction('edit') && Route::has($field->getRoutePrefix() . '.edit'))
    <a href="{{ route($field->getRoutePrefix() . '.edit', $value) }}" data-bs-toggle="tooltip" data-bs-placement="top" title="{{ trans('crud.edit') }}" class="btn btn-sm btn-alt-warning">
        <i class="fa fa-fw fa-pencil-alt"></i>
    </a>
@endif

@if($field->hasAction('destroy') && Route::has($field->getRoutePrefix() . '.destroy'))
    <a href="{{ route($field->getRoutePrefix() . '.destroy', $value) }}" data-confirm-message="{{ trans('crud.confirmation') }}" data-bs-toggle="tooltip" data-bs-placement="top" title="{{ trans('crud.destroy') }}" data-method="delete" class="btn btn-sm btn-alt-danger">
        <i class="fa fa-fw fa-trash"></i>
    </a>
@endif
