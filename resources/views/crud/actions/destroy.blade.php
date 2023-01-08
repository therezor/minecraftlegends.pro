@if($crud->getRouteByMethod('destroy'))
    <a href="{{ route($crud->getRouteByMethod('destroy'), $entity) }}" data-method="delete" data-confirm-message="{{ trans('crud.confirmation') }}" class="btn d-block btn-alt-danger mb-4">
        <i class="fa fa-fw fa-trash"></i>
        {{ trans('crud.destroy') }}
    </a>
@endif
