@extends('layouts.app')

@section('body')
    <div id="page-container">
        <main id="main-container">
            <div class="content content-boxed content-full overflow-hidden">
                <div class="py-lg-3 text-center">
                    <h1 class="h3">
                        @yield('header')
                    </h1>
                </div>
                @yield('container')
            </div>
        </main>
    </div>
@endsection
