@extends('layouts.public')

@section('container')
    <div class="bg-body-light">
        <div class="content content-full">
            <div class="py-3 text-center">
                <h1 class="mb-0">
                    {{ $title }}
                </h1>
            </div>
        </div>
    </div>

    <div class="bg-body-extra-light">
        <div class="content content-boxed">
            {{ $content }}
        </div>
    </div>
@endsection
