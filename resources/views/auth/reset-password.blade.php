@extends('layouts.auth')

@section('heading', __('Reset password'))

@section('subheading', __('Set new password'))

@section('form')
    {{ Form::open(['method' => 'post', 'route' => 'password.update', 'class' => 'space-y-4 md:space-y-6']) }}
    {{ Form::hidden('token', $request->route('token')) }}
    <div>
        {{ Form::label('email', __('Email address'), ['class' => 'block mb-2 text-sm font-medium text-gray-900 dark:text-white']) }}
        {{ Form::email('email', null, ['placeholder' => 'name@company.com', 'required' => true, 'autofocus'=> true, 'class' => 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']) }}
    </div>
    <div>
        {{ Form::label('password', __('Password'), ['class' => 'block mb-2 text-sm font-medium text-gray-900 dark:text-white']) }}
        {{ Form::password('password', ['placeholder' => '••••••••', 'required' => true, 'class' => 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']) }}
    </div>
    <div>
        {{ Form::label('password_confirmation', __('Confirm Password'), ['class' => 'block mb-2 text-sm font-medium text-gray-900 dark:text-white']) }}
        {{ Form::password('password_confirmation', ['placeholder' => '••••••••', 'required' => true, 'class' => 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']) }}
    </div>
    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        {{ __('Reset Password') }}
    </button>
    {{ Form::close() }}
@endsection
