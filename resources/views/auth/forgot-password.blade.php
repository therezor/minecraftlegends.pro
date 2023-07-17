@extends('layouts.auth')

@section('heading', __('Forgot your password?'))

@section('subheading', __('No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.'))

@section('form')
    {{ html()->form('post', route('password.email'))->class('space-y-4 md:space-y-6')->open() }}
        <div>
            {{ html()->label(__('Email address'), 'email')->class('block mb-2 text-sm font-medium text-gray-900 dark:text-white') }}
            {{ html()->email('email')
                ->class('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
                ->placeholder('name@company.com')
                ->required()
                ->autofocus()
             }}
        </div>
        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {{ __('Send Mail') }}
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            {{ __('Remembered password?') }} <a href="{{ route('login') }}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">{{ __('Log in') }}</a>
        </p>
    {{ html()->form()->close() }}
@endsection
