@if($crud->getRouteByMethod(\App\Enums\Crud\Method::EDIT) && !request()->routeIs($crud->getRouteByMethod(\App\Enums\Crud\Method::EDIT)))
    <a href="{{ route($crud->getRouteByMethod(\App\Enums\Crud\Method::EDIT), $entity) }}" class="btn d-block btn-alt-warning mb-3">
        <i class="fa fa-fw fa-pencil"></i>
        {{ trans('crud.edit') }}
    </a>
@endif
