<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
    <div class="container-xl">

        <button class="navbar-toggler bg-dark-focus ms-n2" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" href="{{ route('index') }}">
            <img src="{{ asset('img/logo.png') }}" class="h-8" alt="...">
        </a>

        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav">
                <a class="nav-item nav-link @if(Route::is('index')) active @endif" href="{{ route('index') }}" aria-current="page">Home</a>
                @foreach($categories as $category)
                    <a class="nav-item nav-link @if(Route::is('categories.show') && Route::input('slug')  === $category->slug) active @endif" href="{{ route('categories.show', $category->slug) }}">
                        @if($category->icon) <i class="{{ $category->icon }}"></i> @endif
                        {{ $category->name }}
                    </a>
                @endforeach
            </div>

            <div class="navbar-nav align-items-center d-flex ms-auto">
                {{ Form::open(['method' => 'get', 'route' => 'search', 'class' => 'col-12 col-md-auto form-dark']) }}
                {{ Form::search('term', request()->get('term'), ['class' => 'form-control form-control-sm', 'placeholder' => __('Search...')]) }}
                {{ Form::close() }}

                <div class="mt-md-0 mt-4">
                    @guest
                        <a class="nav-link d-inline-block me-4 me-md-0"
                           href="{{ route('login') }}">{{ __('Log in') }}</a>
                        <a href="{{ route('register') }}" class="btn btn-sm btn-light">{{ __('Register') }}</a>
                    @else
                        <div class="dropdown">
                            <a href="#dropdown-profile" class="nav-link text-center" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i class="bi bi-person-fill"></i>
                                {{ auth()->user()->name }}
                                <i class="bi bi-chevron-down text-xs"></i>
                            </a>
                            <div id="dropdown-profile" class="dropdown-menu dropdown-menu-end px-2 mb-2">
                                @can(\App\Enums\Role\Permission::DASHBOARD_VIEW->value)
                                    <a class="dropdown-item" href="{{ route('panel.index') }}"><i
                                                class="bi bi-tools me-3"></i> {{ __('Dashboard') }}</a>
                                @endif
{{--                                <a class="dropdown-item" href="#"><i--}}
{{--                                            class="bi bi-plus-circle-dotted me-3"></i> {{ __('Add story') }}</a>--}}
{{--                                <a class="dropdown-item" href="#"><i class="bi bi-gear me-3"></i> {{ __('Settings') }}--}}
{{--                                </a>--}}
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button class="dropdown-item btn-link" type="submit">
                                        <i class="bi bi bi-box-arrow-right me-3"></i> {{ __('Log out') }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    @endguest
                </div>
            </div>
        </div>
    </div>
</nav>
