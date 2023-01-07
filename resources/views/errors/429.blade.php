@extends('layouts.error')

@section('title', __('Too Many Requests'))
@section('code', '429')
@section('code-class', 'text-info')
@section('message', __('You have made too many requests to this page. Please wait a while and try again.'))
