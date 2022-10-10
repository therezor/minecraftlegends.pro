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

@push('actions')
    @if($crud->getRouteByMethod('create'))
        <a href="{{ route($crud->getRouteByMethod('create')) }}" class="btn btn-sm btn-success">
            <i class="bi bi-plus-circle-dotted pe-2"></i>
            {{ trans('crud.create') }}
        </a>
    @endif
@endpush

@section('content')
    <div class="card">
        @if($filterForm)
            <div class="card-header border-bottom">
                @include('crud.includes.filters')
            </div>
        @endif

        <div class="table-responsive">
            @include('crud.includes.table')
        </div>

        <div class="card-footer">
            @if(method_exists($entities, 'links'))
                <div class="row align-items-center">
                    <div class="col-md-4 text-muted text-sm">
                       {{ trans('crud.total') }}: {{ $entities->total() }}
                    </div>
                    <div class="col-md-8">
                        {{ $entities->appends(request()->all())->links() }}
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection


