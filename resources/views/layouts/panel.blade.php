@extends('layouts.app')

@section('body')
    <div id="page-container" class="sidebar-o sidebar-dark side-scroll page-header-fixed main-content-narrow side-trans-enabled">
        @include('panel.sections.sidebar')
        @include('panel.sections.header')

        <main id="main-container">
            <div class="bg-body-light">
                <div class="content content-full">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center py-2">
                        <div class="flex-grow-1">
                            <h1 class="h3 fw-bold mb-2">
                                @yield('header')
                            </h1>
                        </div>
                        <nav class="flex-shrink-0 mt-3 mt-sm-0 ms-sm-3">
                            @stack('actions')
                        </nav>
                    </div>
                </div>
            </div>

            <div class="content">
                @include('components.messages')

                @yield('content')
            </div>
        </main>

        @include('sections.footer')
    </div>
@endsection
