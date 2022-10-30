@extends('layouts.app')

@section('body')
    <div class="px-5 py-5 p-lg-0">
        <div class="d-flex justify-content-center">
            <div
                class="col-12 col-md-9 col-lg-7 min-h-lg-screen d-flex flex-column justify-content-center py-lg-16 px-lg-20 position-relative">
                <div class="row">
                    <div class="col-lg-10 col-md-9 col-xl-7 mx-auto">
                        <div class="text-center mb-8">
                            <a class="d-inline-block mb-3" href="{{ route('index') }}">
                                <img src="{{ asset('img/logo.png') }}" class="h-12" alt="...">
                            </a>
                            <div class="h4">{{ __('Forgot your password?') }}</div>
                            <div>{{ __('No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}</div>
                        </div>
                        @include('components.status')
                        @include('components.errors')

                        <form method="POST" action="{{ route('password.email') }}">
                            @csrf
                            <div class="mb-5">
                                <label class="form-label" for="email">{{ __('Email address') }}</label>
                                <input value="{{ old('email') }}" required autofocus type="email" class="form-control" id="email" name="email" placeholder="{{ __('Email address') }}">
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary w-full">
                                    {{ __('Email Password Reset Link') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
