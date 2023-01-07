@extends('layouts.auth')

@section('heading', __('Thanks for signing up!'))

@section('subheading', __('Please check your inbox'))

@section('form')
    {{ Form::open(['method' => 'post', 'route' => 'verification.send']) }}
    <p>
        {{ __('Before getting started, could you verify your email address by clicking on the link we just emailed to you?') }}
    </p>
    <p>
        {{ __('If you didn\'t receive the email, we will gladly send you another.') }}
    </p>
    <div class="row justify-content-center">
        <div class="col-lg-8 col-xxl-8">
            <button type="submit" class="btn w-100 btn-alt-secondary">
                <i class="fa fa-fw fa-paper-plane me-1 opacity-50"></i> {{ __('Resend Email') }}
            </button>
        </div>
    </div>
    {{ Form::close() }}
@endsection

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
                            <div>{{ __('Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.') }}</div>
                        </div>
                        @include('components.status')
                        @include('components.errors')
                        <form method="POST" action="{{ route('verification.send') }}">
                            @csrf

                            <div>
                                <button type="submit" class="btn btn-primary w-full">
                                    {{ __('Resend Verification Email') }}
                                </button>
                            </div>
                        </form>

                        <form method="POST" action="{{ route('logout') }}">
                            @csrf

                            <button type="submit" class="btn btn-secondary w-full">
                                {{ __('Log Out') }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
