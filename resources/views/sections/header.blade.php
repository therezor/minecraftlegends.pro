<header id="page-header">
    <div class="content-header">
        <div class="d-flex align-items-center">
            <a href="{{ route('index') }}">
                <img src="{{ asset('img/logo.png') }}" width="203" height="40" alt="...">
            </a>
        </div>

        <div class="d-flex align-items-center">
            <button type="button" class="btn btn-sm btn-alt-secondary d-md-none" data-toggle="layout" data-action="header_search_on">
                <i class="fa fa-fw fa-search"></i>
            </button>

            {{ Form::open(['method' => 'get', 'route' => 'search', 'class' => 'd-none d-md-inline-block']) }}
                <div class="input-group input-group-sm">
                    {{ Form::search('term', request()->get('term'), ['class' => 'form-control form-control-alt', 'placeholder' => __('Search...')]) }}
                    <span class="input-group-text bg-body border-0">
                        <i class="fa fa-fw fa-search"></i>
                    </span>
                </div>
            {{ Form::close() }}

            @guest
                <div class="dropdown d-lg-none ms-2">
                    <button type="button" class="btn btn-sm btn-alt-secondary d-lg-none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-fw fa-user"></i>
                    </button>

                    <div class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0" aria-labelledby="page-header-user-dropdown" style="">
                        <div class="p-2">
                            <a href="{{ route('register') }}" class="btn btn-sm btn-primary d-block mb-2">{{ __('Register') }}</a>
                            <a class="btn btn-sm btn-outline-primary d-block" href="{{ route('login') }}">{{ __('Log in') }}</a>
                        </div>
                    </div>
                </div>

                <a class="btn btn-sm btn-outline-primary ms-2 d-none d-lg-inline-block" href="{{ route('login') }}">{{ __('Log in') }}</a>
                <a href="{{ route('register') }}" class="btn btn-sm btn-primary ms-2 d-none d-lg-inline-block">{{ __('Register') }}</a>
            @else
                <div class="dropdown d-inline-block ms-2">
                    <button type="button" class="btn btn-sm btn-alt-secondary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-fw fa-user"></i>
                        <span class="d-none d-sm-inline-block ms-2">{{ Str::limit(auth()->user()->name, 9) }}</span>
                        <i class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0" aria-labelledby="page-header-user-dropdown" style="">
                        <div class="p-3 text-center bg-body-light border-bottom rounded-top">
                            <p class="mt-2 mb-0 fw-medium">{{ auth()->user()->name }}</p>
                            <p class="mb-0 text-muted fs-sm fw-medium">{{ auth()->user()->role->name }}</p>
                        </div>
                        @can(\App\Enums\Role\Permission::DASHBOARD_VIEW->value)
                            <div class="p-2">
                                <a class="dropdown-item fs-sm fw-medium" href="{{ route('filament.pages.dashboard') }}">
                                    <i class="fa fas fa-fw fa-table-columns"></i> {{ __('Dashboard') }}
                                </a>
                            </div>
                            <div role="separator" class="dropdown-divider m-0"></div>
                        @endif
                        <div class="p-2">
                            {{ Form::open(['method' => 'post', 'route' => 'logout']) }}
                                <button class="dropdown-item btn-link fs-sm fw-medium" type="submit">
                                    <i class="fa fas fa-fw fa-right-from-bracket"></i> {{ __('Log out') }}
                                </button>
                            {{ Form::close() }}
                        </div>
                    </div>
                </div>
            @endguest
        </div>

        <div id="page-header-search" class="overlay-header bg-body-extra-light">
            <div class="content-header">
                {{ Form::open(['method' => 'get', 'route' => 'search', 'class' => 'w-100']) }}
                    <div class="input-group">
                        <button type="button" class="btn btn-alt-danger" data-toggle="layout" data-action="header_search_off">
                            <i class="fa fa-fw fa-times-circle"></i>
                        </button>
                        {{ Form::search('term', request()->get('term'), ['class' => 'form-control', 'placeholder' => __('Search...')]) }}
                    </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
</header>
