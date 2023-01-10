@if($crud->getRouteByMethod(\App\Enums\Crud\Method::DESTROY))
    <a href="{{ route($crud->getRouteByMethod(\App\Enums\Crud\Method::DESTROY), $entity) }}" data-method="delete" data-confirm-message="{{ trans('crud.confirmation') }}" class="btn d-block btn-alt-danger mb-4">
        <i class="fa fa-fw fa-trash"></i>
        {{ trans('crud.destroy') }}
    </a>
@endif
