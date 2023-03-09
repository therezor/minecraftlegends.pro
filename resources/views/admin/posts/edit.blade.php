@extends('layouts.admin')

@section('header', $crud->title())

@section('content')
    {!! form_start($form) !!}
    <div class="block block-rounded">
        <div class="block-header block-header-default">
            <h3 class="block-title">{{ trans('crud.edit') }}</h3>
        </div>
        <div class="block-content">
            <div class="row">
                <div class="col-md-6">
                    {!! form_rows($form, ['title', 'slug', 'status', 'category']) !!}
                </div>
                <div class="col-md-6">
                    {!! form_rows($form, ['image']) !!}
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    {!! form_rows($form, ['category_id']) !!}
                </div>
                <div class="col-md-6">
                    {!! form_rows($form, ['featured']) !!}
                </div>
            </div>

            {!! form_rows($form, ['description']) !!}

            {!! form_rows($form, ['content']) !!}

            <div class="d-flex flex-row mb-4">
                <a href="{{ URL::previous() }}" class="btn btn-alt-secondary">{{ trans('crud.cancel') }}</a>
                <button type="submit" class="ms-auto btn btn-primary">{{ trans('crud.update') }}</button>
            </div>
        </div>
    </div>
    {!! form_end($form) !!}
@endsection
