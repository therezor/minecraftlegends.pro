@if($crud->getRouteByMethod(\App\Enums\Crud\Method::INDEX) && !request()->routeIs($crud->getRouteByMethod(\App\Enums\Crud\Method::INDEX)))
    <a href="{{ route($crud->getRouteByMethod(\App\Enums\Crud\Method::INDEX), $params + [$entity]) }}" class="btn d-block btn-alt-primary mb-3">
        <i class="fa fa-fw fa-list"></i>
        {{ trans('crud.back_to_list') }}
    </a>
@endif
