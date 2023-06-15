@extends('layouts.auth')

@section('heading', __('Login'))

@section('subheading', __('Great to have you back!'))

@section('form')
    {{ Form::open(['method' => 'post', 'route' => 'login', 'class' => 'space-y-4 md:space-y-6']) }}
    <form class="space-y-4 md:space-y-6" action="#">
        <div>
            {{ Form::label('email', __('Email address'), ['class' => 'block mb-2 text-sm font-medium text-gray-900 dark:text-white']) }}
            {{ Form::email('email', null, ['placeholder' => 'name@company.com', 'required' => true, 'autofocus'=> true, 'class' => 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']) }}
        </div>
        <div>
            {{ Form::label('password', __('Password'), ['class' => 'block mb-2 text-sm font-medium text-gray-900 dark:text-white']) }}
            {{ Form::password('password', ['placeholder' => '••••••••', 'required' => true, 'class' => 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']) }}
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    {{ Form::checkbox('remember', 1, true, ['id' => 'remember', 'class' => 'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800']) }}
                </div>
                <div class="ml-3 text-sm">
                    {{ Form::label('remember', __('Remember me'), ['class' => 'text-gray-500 dark:text-gray-300']) }}
                </div>
            </div>
            <a href="{{ route('password.request') }}" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">{{ __('Forgot your password?') }}</a>
        </div>
        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            {{ __('Don\'t have an account?') }} <a href="{{ route('register') }}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">{{ __('Sign up') }}</a>
        </p>
    {{ Form::close() }}
@endsection
