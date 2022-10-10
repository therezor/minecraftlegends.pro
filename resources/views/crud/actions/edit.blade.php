@if($crud->getRouteByMethod('edit') && !request()->routeIs($crud->getRouteByMethod('edit')))
    <a href="{{ route($crud->getRouteByMethod('edit'), $entity) }}" class="btn d-block btn-neutral mb-4">
        <i class="bi bi-pencil text-warning"></i>
        {{ trans('crud.edit') }}
    </a>
@endif
