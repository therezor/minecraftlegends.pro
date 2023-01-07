@extends('layouts.error')

@section('title', __('Access Denied'))
@section('code', '401')
@section('code-class', 'text-city')
@section('message', __('You are not authorized to access this page. Please login with the correct credentials and try again.'))
