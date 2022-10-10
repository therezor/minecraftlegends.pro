@extends('layouts.panel')

@section('title', $crud->title())

@section('header')
    <h1 class="h2 mb-0 ls-tight">
        {{ $crud->title() }}
        <span class="h4 text-muted">
            {{ trans('crud.edit') }}
        </span>
    </h1>
@endsection

@section('content')
    <div class="row g-5">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    {!! form_start($form) !!}
                    {!! form_rest($form) !!}
                    <div class="d-flex flex-row gap-3">
                        <a href="{{ URL::previous() }}" class="btn btn-neutral">{{ trans('crud.cancel') }}</a>
                        <button type="submit" class="ms-auto btn btn-primary">{{ trans('crud.update') }}</button>
                    </div>
                    {!! form_end($form) !!}
                </div>
            </div>
        </div>
        @include('crud.includes.actions')
    </div>
@endsection
