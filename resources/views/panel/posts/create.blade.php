@extends('layouts.panel')

@section('title', $crud->title())

@section('header')
    <h1 class="h2 mb-0 ls-tight">
        {{ $crud->title() }}
        <span class="h4 text-muted">
            {{ trans('crud.create') }}
        </span>
    </h1>
@endsection

@section('content')
    <div class="row g-5">
        @livewire('panel.posts.form', ['entity' => $entity])
    </div>
@endsection
