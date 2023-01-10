@extends('layouts.panel')

@section('header', $crud->title())

@push('actions')
    @if($crud->getRouteByMethod(\App\Enums\Crud\Method::CREATE))
        <a href="{{ route($crud->getRouteByMethod(\App\Enums\Crud\Method::CREATE)) }}" class="btn btn-alt-success">
            <i class="fa fa-fw fa-plus"></i>
            {{ trans('crud.create') }}
        </a>
    @endif
@endpush

@section('content')
    <div class="block block-rounded">
        <div class="block-header block-header-default">
            <div class="block-title">
                {{ trans('crud.list') }}
            </div>
            @if($filterForm)
                @include('crud.includes.filters')
            @endif
        </div>

        <div class="block-content">
            <div class="table-responsive">
                @include('crud.includes.table')
            </div>
        </div>

        <div class="block-content block-content-full block-content-sm bg-body-light fs-sm">
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


