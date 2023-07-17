@extends('layouts.auth')

@section('heading', __('Sign up'))

@section('subheading', __('Create new account'))


@section('form')
    {{ html()->form('post', route('register'))->class('space-y-4 md:space-y-6')->open() }}
        <div>
            {{ html()->label(__('Name'), 'name')->class('block mb-2 text-sm font-medium text-gray-900 dark:text-white') }}
            {{ html()->text('name')
                ->class('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
                ->placeholder('John Doe')
                ->minlength(2)
                ->required()
                ->autofocus()
             }}
        </div>
        <div>
            {{ html()->label(__('Email address'), 'email')->class('block mb-2 text-sm font-medium text-gray-900 dark:text-white') }}
            {{ html()->email('email')
                ->class('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
                ->placeholder('name@company.com')
                ->required()
             }}
        </div>
        <div>
            {{ html()->label(__('Password'), 'password')->class('block mb-2 text-sm font-medium text-gray-900 dark:text-white') }}
            {{ html()->password('password')
               ->class('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
               ->placeholder('••••••••')
               ->required()
            }}
        </div>
        <div>
            {{ html()->label(__('Confirm Password'), 'password_confirmation')->class('block mb-2 text-sm font-medium text-gray-900 dark:text-white') }}
            {{ html()->password('password_confirmation')
               ->class('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
               ->placeholder('••••••••')
               ->required()
            }}
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    {{ html()->checkbox('accept_terms')
                       ->class('w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800')
                       ->required()
                    }}
                </div>
                <div class="ml-3 text-sm">
                    {{ html()->label(__('I agree to'), 'accept_terms')->class('text-gray-500 dark:text-gray-300') }}

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
    {{ html()->form()->close() }}
@endsection
