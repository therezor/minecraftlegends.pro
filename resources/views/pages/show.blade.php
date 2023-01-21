@extends('layouts.public')

@section('container')
    <div class="bg-body-light">
        <div class="content content-full">
            <div class="py-3 text-center">
                <h1 class="h3 fw-bold mb-2">
                    {{ $page->title }}
                </h1>
            </div>
        </div>
    </div>

    <div class="bg-body-extra-light">
        <div class="content content-boxed">
            @foreach($page->content->blocks() as $block)
                @include('fields.blocks.' . $block['type'], ['data' => $block['data']])
            @endforeach
        </div>
    </div>
@endsection
