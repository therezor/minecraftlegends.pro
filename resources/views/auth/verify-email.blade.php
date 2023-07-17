@extends('layouts.auth')

@section('heading', __('Thanks for signing up!'))

@section('subheading', __('Please check your inbox'))

@section('form')
    {{ html()->form('post', route('verification.send'))->class('space-y-4 md:space-y-6')->open() }}
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            {{ __('Before getting started, could you verify your email address by clicking on the link we just emailed to you?') }}
        </p>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            {{ __('If you didn\'t receive the email, we will gladly send you another.') }}
        </p>
        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {{ __('Resend Email') }}
        </button>
    {{ html()->form()->close() }}
@endsection
