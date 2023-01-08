@extends('layouts.app')

@section('body')
    <div id="page-container" class="page-header-fixed main-content-boxed">
        @include('sections.header')

        <main id="main-container">
            @yield('container')
        </main>

        @include('sections.footer')
    </div>
@endsection
