@extends('layouts.app')

@section('body')
    @include('sections.header')

    @yield('content')

    @include('sections.footer')
@endsection
