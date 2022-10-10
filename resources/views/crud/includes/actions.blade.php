@if($crud->getEntityActions())
    <div class="col-md-4">
        @foreach($crud->getEntityActions() as $action)
            @include($action)
        @endforeach
    </div>
@endif
