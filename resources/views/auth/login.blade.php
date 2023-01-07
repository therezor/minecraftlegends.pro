@extends('layouts.auth')

@section('heading', __('Login'))

@section('subheading', __('Great to have you back!'))

@section('form')
    {{ Form::open(['method' => 'post', 'route' => 'login']) }}
        <div class="py-3">
            <div class="mb-4">
                {{ Form::email('email', null, ['placeholder' => __('Email address'), 'required' => true, 'autofocus'=> true, 'class' => 'form-control form-control-lg form-control-alt']) }}
            </div>
            <div class="mb-4">
                {{ Form::password('password', ['placeholder' => __('Password'), 'required' => true, 'class' => 'form-control form-control-lg form-control-alt']) }}
            </div>
            <div class="mb-4">
                <div class="d-md-flex align-items-md-center justify-content-md-between">
                    <div class="form-check">
                        {{ Form::checkbox('remember', 1, null, ['id' => 'remember-me', 'class' => 'form-check-input']) }}
                        <label class="form-check-label" for="remember-me">
                            {{ __('Remember me') }}
                        </label>
                    </div>
                    <div class="py-2">
                        <a href="{{ route('password.request') }}" class="fs-sm fw-medium">{{ __('Forgot your password?') }}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-6 col-xxl-5">
                <button type="submit" class="btn w-100 btn-alt-primary">
                    <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i> {{ __('Log in') }}
                </button>
            </div>
        </div>
    {{ Form::close() }}
@endsection

@section('footer')
    <div class="fs-sm text-center text-muted py-3">
        {{ __('Don\'t have an account?') }}
        <a href="{{ route('register') }}">{{ __('Register') }}</a>
    </div>
@endsection
