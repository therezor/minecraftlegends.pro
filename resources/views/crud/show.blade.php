@extends($crud->layout())

@section('header', $crud->title())

@section('content')
    <div class="row">
        <div class="col-md-8">
            <div class="block block-rounded">
                <div class="block-header block-header-default">
                    <h3 class="block-title">{{ trans('crud.show') }}</h3>
                </div>
                <div class="block-content">
                    <table class="table table-vcenter">
                        <tbody>
                        @foreach($fields as $field)
                            <tr>
                                <td class="ps-0 fw-medium">{{ $field->resolveLabel($entity) }}</td>
                                <td class="pe-0 text-end">{{ $field->render($entity) }}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        @include('crud.includes.actions')
    </div>
@endsection
