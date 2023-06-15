@extends('layouts.auth')

@section('heading', __('Sign up'))

@section('subheading', __('Create new account'))


@section('form')
    {{ Form::open(['method' => 'post', 'route' => 'register', 'class' => 'space-y-4 md:space-y-6']) }}
        <div>
            {{ Form::label('name', __('Name'), ['class' => 'block mb-2 text-sm font-medium text-gray-900 dark:text-white']) }}
            {{ Form::text('name', null, ['placeholder' => 'John Doe', 'minlength' => 2, 'required' => true, 'autofocus'=> true, 'class' => 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']) }}
        </div>
        <div>
            {{ Form::label('email', __('Email address'), ['class' => 'block mb-2 text-sm font-medium text-gray-900 dark:text-white']) }}
            {{ Form::email('email', null, ['placeholder' => 'name@company.com', 'required' => true, 'class' => 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']) }}
        </div>
        <div>
            {{ Form::label('password', __('Password'), ['class' => 'block mb-2 text-sm font-medium text-gray-900 dark:text-white']) }}
            {{ Form::password('password', ['placeholder' => '••••••••', 'required' => true, 'class' => 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']) }}
        </div>
        <div>
            {{ Form::label('password_confirmation', __('Confirm Password'), ['class' => 'block mb-2 text-sm font-medium text-gray-900 dark:text-white']) }}
            {{ Form::password('password_confirmation', ['placeholder' => '••••••••', 'required' => true, 'class' => 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']) }}
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    {{ Form::checkbox('accept_terms', 1, false, ['id' => 'accept_terms', 'required' => true, 'class' => 'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800']) }}
                </div>
                <div class="ml-3 text-sm">
                    {{ Form::label('accept_terms', __('I agree to'), ['class' => 'text-gray-500 dark:text-gray-300']) }}
                    <a href="{{ route('path', 'terms-and-conditions') }}" target="_blank" class="font-medium text-primary-600 hover:underline dark:text-primary-500">{{ __('Terms & Conditions') }}</a>
                </div>
            </div>
        </div>
        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {{ __('Sign up') }}
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            {{ __('Already registered?') }} <a href="{{ route('login') }}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">{{ __('Log in') }}</a>
        </p>
    {{ Form::close() }}
@endsection
