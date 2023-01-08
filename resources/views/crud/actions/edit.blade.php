@if($crud->getRouteByMethod('edit') && !request()->routeIs($crud->getRouteByMethod('edit')))
    <a href="{{ route($crud->getRouteByMethod('edit'), $entity) }}" class="btn d-block btn-alt-warning mb-3">
        <i class="fa fa-fw fa-pencil"></i>
        {{ trans('crud.edit') }}
    </a>
@endif
