@extends('layouts.error')

@section('title', __('Maintenance in Progress'))
@section('code')
    <i class="fa fa-cog fa-spin text-primary"></i>
@endsection
@section('message', __('We apologize for the inconvenience, but the site is currently down for maintenance. Please check back soon.'))
