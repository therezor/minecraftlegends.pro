@if($crud->getRouteByMethod(\App\Enums\Crud\Method::SHOW) && !request()->routeIs($crud->getRouteByMethod(\App\Enums\Crud\Method::SHOW)))
    <a href="{{ route($crud->getRouteByMethod(\App\Enums\Crud\Method::SHOW), $params + [$entity]) }}" class="btn d-block btn-alt-info mb-3">
        <i class="fa fa-fw fa-eye"></i>
        {{ trans('crud.show') }}
    </a>
@endif
