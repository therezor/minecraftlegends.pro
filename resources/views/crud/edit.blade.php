@extends($crud->layout())

@section('header', $crud->title())

@section('content')
    <div class="row">
        <div class="col-md-8">
            <div class="block block-rounded">
                <div class="block-header block-header-default">
                    <h3 class="block-title">{{ trans('crud.edit') }}</h3>
                </div>
                <div class="block-content">
                    {!! form_start($form) !!}
                    {!! form_rest($form) !!}
                    <div class="d-flex flex-row mb-4">
                        <a href="{{ URL::previous() }}" class="btn btn-alt-secondary">{{ trans('crud.cancel') }}</a>
                        <button type="submit" class="ms-auto btn btn-primary">{{ trans('crud.update') }}</button>
                    </div>
                    {!! form_end($form) !!}
                </div>
            </div>
        </div>
        @include('crud.includes.actions')
    </div>
@endsection
