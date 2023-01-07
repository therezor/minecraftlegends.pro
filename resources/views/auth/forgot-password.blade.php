@extends('layouts.auth')

@section('heading', __('Forgot your password?'))

@section('subheading', __('No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.'))

@section('form')
    {{ Form::open(['method' => 'post', 'route' => 'password.email']) }}
    <div class="py-3">
        <div class="mb-4">
            {{ Form::email('email', null, ['placeholder' => __('Email address'), 'required' => true, 'autofocus'=> true, 'class' => 'form-control form-control-lg form-control-alt']) }}
        </div>
    </div>
    <div class="row justify-content-center mb-4">
        <div class="col-lg-6 col-xxl-6">
            <button type="submit" class="btn w-100 btn-primary">
                <i class="fa fa-fw fa-envelope me-1"></i> {{ __('Send Mail') }}
            </button>
        </div>
    </div>
    {{ Form::close() }}
@endsection

@section('footer')
    <div class="fs-sm text-center text-muted py-3">
        {{ __('Remembered password?') }}
        <a href="{{ route('login') }}">{{ __('Log in') }}</a>
    </div>
@endsection
