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
                                <h1 class="h2 mb-0 ls-tight">{{ $crudName }} <span class="text-muted text-sm">{{ __('Create') }}</span></h1>
                            </div>
                            <!-- Actions -->
                            <div class="col-sm-6 col-12 text-sm-end">
                                <div class="mx-n1">
                                    <a href="{{ route($routePrefix . '.index') }}" class="btn btn-close btn-link" aria-label="{{ __('Close') }}"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <!-- Main -->
            <main class="pb-6 bg-surface-secondary">
                @livewire($routePrefix . '.form', ['routePrefix' => $routePrefix, 'id' => null])
            </main>
        </div>
    </div>
@endsection
