@if($crud->getRouteByMethod('show') && !request()->routeIs($crud->getRouteByMethod('show')))
    <a href="{{ route($crud->getRouteByMethod('show'), $entity) }}" class="btn d-block btn-alt-info mb-3">
        <i class="fa fa-fw fa-eye"></i>
        {{ trans('crud.show') }}
    </a>
@endif
