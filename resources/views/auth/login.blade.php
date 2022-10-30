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
                            <div class="h4">{{ __('Login to continue') }}</div>
                        </div>
                        @include('components.status')
                        @include('components.errors')
                        <form method="POST" action="{{ route('login') }}">
                            @csrf
                            <div class="mb-5">
                                <label class="form-label" for="email">{{ __('Email address') }}</label>
                                <input value="{{ old('email') }}" required autofocus type="email" class="form-control" id="email" name="email" placeholder="{{ __('Email address') }}">
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="password">{{ __('Password') }}</label>
                                <input required type="password" class="form-control" id="password" name="password" placeholder="{{ __('Password') }}" autocomplete="current-password">
                                <a href="{{ route('password.request') }}" class="text-sm">{{ __('Forgot your password?') }}</a>
                            </div>
                            <div class="mb-5">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember-me">
                                    <label class="form-check-label" for="remember-me">
                                        {{ __('Remember me') }}
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary w-full">
                                    {{ __('Log in') }}
                                </button>
                            </div>
                        </form>
                        <div class="my-6">
                            <small>{{ __('Don\'t have an account?') }}</small>
                            <a href="{{ route('register') }}" class="text-warning text-sm font-semibold">{{ __('Register') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
