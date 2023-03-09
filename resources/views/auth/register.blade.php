@extends('layouts.auth')

@section('heading', __('Register'))

@section('subheading', __('Create new account'))

@section('form')
    {{ Form::open(['method' => 'post', 'route' => 'register']) }}
        <div class="py-3">
            <div class="mb-4">
                {{ Form::text('name', null, ['placeholder' => __('Name'), 'minlength' => 2, 'required' => true, 'autofocus'=> true, 'class' => 'form-control form-control-lg form-control-alt']) }}
            </div>
            <div class="mb-4">
                {{ Form::email('email', null, ['placeholder' => __('Email address'), 'required' => true, 'class' => 'form-control form-control-lg form-control-alt']) }}
            </div>
            <div class="mb-4">
                {{ Form::password('password', ['placeholder' => __('Password'), 'required' => true, 'minlength' => 8, 'class' => 'form-control form-control-lg form-control-alt']) }}
            </div>
            <div class="mb-4">
                {{ Form::password('password_confirmation', ['placeholder' => __('Confirm Password'), 'required' => true, 'minlength' => 8, 'class' => 'form-control form-control-lg form-control-alt']) }}
            </div>
            <div class="mb-4">
                <div class="d-md-flex align-items-md-center justify-content-md-between">
                    <div class="form-check">
                        {{ Form::checkbox('accept_terms', 1, null, ['required' => true, 'id' => 'accept-terms', 'class' => 'form-check-input']) }}
                        <label class="form-check-label" for="accept-terms">
                            {{ __('I agree to Terms & Conditions') }}
                        </label>
                    </div>
                    <div class="py-2">
                        <a href="{{ route('pages.terms') }}" target="_blank" class="fs-sm fw-medium">{{ __('View') }}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-6 col-xxl-5">
                <button type="submit" class="btn w-100 btn-alt-success">
                    <i class="fa fa-fw fa-plus me-1 opacity-50"></i> {{ __('Register') }}
                </button>
            </div>
        </div>
    {{ Form::close() }}
@endsection

@section('footer')
    <div class="fs-sm text-center text-muted py-3">
        {{ __('Already registered?') }}
        <a href="{{ route('login') }}">{{ __('Log in') }}</a>
    </div>
@endsection
