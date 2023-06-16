@extends('layouts.app')

@section('body')
    <section class="min-h-screen flex bg-white dark:bg-gray-900">
        <div class="py-8 px-4 m-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
                <h1 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {{ __('You need to setup your homepage first!') }}
                </h1>
                <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                    {{ __('To set up your homepage, create a new page in admin panel with a slug of') }}
                    <var class="inline-block px-3 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">&sol;</var>
                </p>
                <a href="{{ route('filament.resources.content.pages.create') }}" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                    {{ __('Setup homepage') }}
                    <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </div>
    </section>
@endsection
