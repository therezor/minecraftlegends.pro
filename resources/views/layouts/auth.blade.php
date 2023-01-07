@extends('layouts.app')

@section('body')
    <div class="hero-static d-flex align-items-center">
        <div class="w-100">

            <div class="fs-sm text-center text-muted py-3">
                <a href="{{ route('index') }}">
                    <img src="{{ asset('img/logo.png') }}" alt="..." width="254" height="50">
                </a>
            </div>

            <div class="bg-body-extra-light">
                <div class="content content-full">
                    <div class="row g-0 justify-content-center">
                        <div class="col-md-8 col-lg-6 col-xl-4 py-4 px-4 px-lg-5">

                            <div class="text-center">
                                <h1 class="h4 mb-2">
                                    @yield('heading')
                                </h1>
                                <p class="fw-medium text-muted mb-3">
                                    @yield('subheading')
                                </p>
                            </div>

                            @include('components.status')
                            @include('components.errors')

                            @yield('form')
                        </div>
                    </div>
                </div>
            </div>

            @yield('footer')
        </div>
    </div>
@endsection
