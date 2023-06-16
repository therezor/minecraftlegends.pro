@extends('layouts.app')

@section('body')
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 pt-6 pb-14 mx-auto min-h-screen">
            <a href="{{ route('index') }}" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="h-12" src="{{ Storage::disk('public')->url(config('app.logo')) }}" alt="...">
            </a>

            <div class="w-full bg-white rounded-lg shadow dark:border mb-10 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="text-center">
                        <h1 class="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white mb-2">
                            @yield('heading')
                        </h1>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            @yield('subheading')
                        </p>
                    </div>

                    @include('components.status')
                    @include('components.errors')

                    @yield('form')
                </div>
            </div>
        </div>
    </section>
@endsection
