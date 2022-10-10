@if($crud->getRouteByMethod('destroy'))
    <a href="{{ route($crud->getRouteByMethod('destroy'), $entity) }}" data-method="delete" data-confirm-message="{{ trans('crud.confirmation') }}" class="btn d-block btn-neutral mb-4">
        <i class="bi bi-trash text-danger"></i>
        {{ trans('crud.destroy') }}
    </a>
@endif
