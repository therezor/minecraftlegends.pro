@extends('layouts.panel')

@section('body')
    <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        @include('panel.sections.sidebar')
        <!-- Main content -->
        <div class="h-screen flex-grow-1 overflow-y-lg-auto">
            <!-- Header -->
            <header class="py-6">
                <div class="container-fluid">
                    <div class="mb-npx">
                        <div class="row align-items-center">
                            <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                                <!-- Title -->
                                <h1 class="h2 mb-0 ls-tight">{{ $crudName }}</h1>
                            </div>
                            <!-- Actions -->
                            @if(Route::has($routePrefix . '.create'))
                                <div class="col-sm-6 col-12 text-sm-end">
                                    <div class="mx-n1">
                                        <a href="{{ route($routePrefix . '.create') }}" class="btn d-inline-flex btn-sm btn-primary mx-1">
                                          <span class="pe-2">
                                            <i class="bi bi-plus-circle-dotted"></i>
                                          </span>
                                            <span>{{ __('Create') }}</span>
                                        </a>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </header>
            <!-- Main -->
            <main class="pb-6 bg-surface-secondary">
                @livewire($routePrefix . '.table')
            </main>
        </div>
    </div>
@endsection
