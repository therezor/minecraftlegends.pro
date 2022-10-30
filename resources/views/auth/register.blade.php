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
                            <div class="h4">{{ __('Create new account') }}</div>
                        </div>
                        @include('components.status')
                        @include('components.errors')
                        <form method="POST" action="{{ route('register') }}">
                            @csrf
                            <div class="mb-5">
                                <label class="form-label" for="name">{{ __('Name') }}</label>
                                <input value="{{ old('name') }}" minlength="2" required autofocus type="text" class="form-control" id="name" name="name" placeholder="{{ __('Name') }}">
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="email">{{ __('Email address') }}</label>
                                <input value="{{ old('email') }}" required type="email" class="form-control" id="email" name="email" placeholder="{{ __('Email address') }}">
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="password">{{ __('Password') }}</label>
                                <input required type="password" minlength="8" class="form-control" id="password" name="password" placeholder="{{ __('Password') }}" autocomplete="current-password">
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="password-confirmation">{{ __('Confirm Password') }}</label>
                                <input required type="password" minlength="8" class="form-control" id="password-confirmation" name="password_confirmation" placeholder="{{ __('Confirm Password') }}" autocomplete="current-password">
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary w-full">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </form>
                        <div class="my-6">
                            <small>{{ __('Already registered?') }}</small>
                            <a href="{{ route('login') }}" class="text-warning text-sm font-semibold">{{ __('Log in') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
