@extends('layouts.simple')

@section('header', $title)

@section('container')
    <div class="row push row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col">
            <a class="block block-rounded block-link-pop text-center mb-0 h-100" href="{{ route('sites.create') }}">
                <div class="block-content block-content-full fw-semibold text-success h-100 d-flex align-items-center justify-content-center">
                    <div>
                        <div class="fs-1">
                            <i class="fa fa-plus"></i>
                        </div>
                        <p class="fw-semibold mb-0">
                            {{ trans('sites.create.title') }}
                        </p>
                    </div>
                </div>
            </a>
        </div>
        @foreach($sites as $site)
            <div class="col">
                <a class="block block-rounded block-link-pop text-center mb-0 h-100" href="{{ route('sites.show', $site->sub_domain) }}">
                    <div class="block-content block-content-full block-content-sm">
                        <p class="fw-semibold mb-0">{{  $site->sub_domain }}</p>
                    </div>
                    <div class="block-content block-content-full" style="background-color: #ddd">
                        <img class="img-avatar img-avatar-thumb img-avatar-rounded" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1676842454~exp=1676843054~hmac=3fa7a5b35f2bd1a7f0c84f8b40bc7d8e0b3bf15f0198bb5df8c2d3b2d07a0779" alt="">
                    </div>
                    <div class="block-content block-content-full block-content-sm">
                        <p class="fs-sm fw-medium text-muted mb-0">{{ $site->name }}</p>
                    </div>
                </a>
            </div>
        @endforeach

        {{ $sites->appends(request()->all())->links() }}
    </div>
@endsection
