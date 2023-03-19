@extends('layouts.panel')

@section('header', $title)

@section('content')
    <div class="row push row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        @foreach($pages as $page)
            <div class="col">
                <a class="block block-rounded block-link-pop text-center mb-0 h-100" href="{{ route('panel.pages.edit', [$hostname, $page->id]) }}">
                    <div class="block-content block-content-full block-content-sm">
                        <p class="fw-semibold mb-0">
                            @if($page->slug  === '/')
                                <i class="fa faw fa-home"></i>
                            @else
                                {{ $page->slug }}
                            @endif
                        </p>
                    </div>
                    <div class="ratio ratio-16x9 bg-light">
                        <img class="img-fluid" src="{{ $page->meta_image_id ? imageUrl($page->meta_image_id) : asset('img/image-default.png') }}" alt="{{ $page->name }}">
                    </div>
                    <div class="block-content block-content-full block-content-sm">
                        <p class="fs-sm fw-medium text-muted mb-0">{{ $page->name }}</p>
                    </div>
                </a>
            </div>
        @endforeach

        <div class="col">
            <a class="block block-rounded block-link-pop text-center mb-0 h-100" href="{{ route('panel.pages.create', $hostname) }}">
                <div class="block-content block-content-full fw-semibold text-success h-100 d-flex align-items-center justify-content-center">
                    <div>
                        <div class="fs-1">
                            <i class="fa fa-plus"></i>
                        </div>
                        <p class="fw-semibold mb-0">
                            {{ trans('panel.pages.create') }}
                        </p>
                    </div>
                </div>
            </a>
        </div>
    </div>
@endsection


