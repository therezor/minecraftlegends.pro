@if($crud->getRouteByMethod('show') && !request()->routeIs($crud->getRouteByMethod('show')))
    <a href="{{ route($crud->getRouteByMethod('show'), $entity) }}" class="btn d-block btn-neutral mb-4">
        <i class="bi bi-eye text-info"></i>
        {{ trans('crud.show') }}
    </a>
@endif
