@extends('layouts.panel')

@section('title', $crud->title())

@section('header')
    <h1 class="h2 mb-0 ls-tight">
        {{ $crud->title() }}

        <span class="h4 text-muted">
            {{ trans('crud.list') }}
        </span>
    </h1>
@endsection

@section('content')
    <div class="row row g-5">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <div class="list-group list-group-flush">
                        @foreach($fields as $field)
                            <div class="list-group-item d-flex align-items-center">
                                <div class="flex-fill">
                                    <div class="h6 font-semibold mb-1">
                                        {{ $field->resolveLabel($entity) }}
                                    </div>

                                    <div class="text-sm mb-2">
                                        {{ $field->render($entity) }}
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        @include('crud.includes.actions')
    </div>
@endsection
