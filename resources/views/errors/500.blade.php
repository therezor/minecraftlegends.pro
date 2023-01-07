@extends('layouts.error')

@section('title', __('Internal Server Error'))
@section('code', '500')
@section('code-class', 'text-danger')
@section('message', __('An internal server error has occurred. Please try again later.'))
