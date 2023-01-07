@extends('layouts.auth')

@section('heading', __('Reset password'))

@section('subheading', __('Set new password'))

@section('form')
    {{ Form::open(['method' => 'post', 'route' => 'password.update']) }}
    <div class="py-3">
        {{ Form::hidden('token', $request->route('token')) }}
        <div class="mb-4">
            {{ Form::email('email', $request->get('email'), ['placeholder' => __('Email address'), 'required' => true, 'class' => 'form-control form-control-lg form-control-alt']) }}
        </div>
        <div class="mb-4">
            {{ Form::password('password', ['placeholder' => __('Password'), 'required' => true, 'minlength' => 8, 'class' => 'form-control form-control-lg form-control-alt']) }}
        </div>
        <div class="mb-4">
            {{ Form::password('password_confirmation', ['placeholder' => __('Confirm Password'), 'required' => true, 'minlength' => 8, 'class' => 'form-control form-control-lg form-control-alt']) }}
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-xxl-6">
            <button type="submit" class="btn w-100 btn-alt-success">
                <i class="fa fa-fw fa-lock-open me-1 opacity-50"></i>  {{ __('Reset Password') }}
            </button>
        </div>
    </div>
    {{ Form::close() }}
@endsection
