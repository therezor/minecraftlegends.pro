@extends('layouts.panel')

@section('header', $crud->title())

@section('content')
    {!! form_start($form) !!}
        <div class="row">
        <div class="col-md-8">
            <div class="block block-rounded">
                <div class="block-header block-header-default">
                    <h3 class="block-title">{{ trans('crud.create') }}</h3>
                </div>
                <div class="block-content">
                    {!! form_rows($form, ['title', 'slug', 'description']) !!}
                </div>
            </div>
            <div class="block block-rounded">
                <div class="block-content">
                    <div id="post-editor"></div>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="block block-rounded">
                <div class="block-content">
                    <div class="mb-4">
                        {!! form_rows($form, ['image', 'category_id', 'status', 'featured']) !!}
                    </div>

                    <div class="d-flex flex-row mb-4">
                        <a href="{{ URL::previous() }}" class="btn btn-alt-secondary">{{ trans('crud.cancel') }}</a>
                        <button type="submit" class="ms-auto btn btn-primary">{{ trans('crud.create') }}</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
    {!! form_end($form) !!}
@endsection

{{--@push('scripts')--}}
{{--    <script defer src="{{ mix('js/post-editor.js') }}"></script>--}}
{{--@endpush--}}
