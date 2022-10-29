@extends('layouts.app')

@section('body')
    @include('sections.header')

    <div class="py-5 container-xl">
        <h1 class="mb-5">{{ $page->title }}</h1>
        {!! $page->content !!}
    </div>
    @include('sections.footer')
@endsection
