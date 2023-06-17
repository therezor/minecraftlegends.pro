@extends('layouts.default')

@section('content')
    @foreach($page->content as $block)
        @include('content.pages.blocks.' . $block['type'], ['data' => $block['data']])
    @endforeach

    @include('content.pages.blocks.feature')

    @include('content.pages.blocks.content')

    @include('content.pages.blocks.testimonial')

    @include('content.pages.blocks.portfolio')

    @include('content.pages.blocks.blog')

    @include('content.pages.blocks.contact')

    @include('content.pages.blocks.faq')

    @include('content.pages.blocks.action')

@endsection
