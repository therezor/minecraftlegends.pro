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
                        <h1 class="h2 mb-0 ls-tight">{{ __('Dashboard') }}</h1>
                    </div>
                </div>
            </header>
            <!-- Main -->
            <main class="py-6 bg-surface-secondary">
                <div class="container-fluid">

                </div>
            </main>
        </div>
    </div>
@endsection
