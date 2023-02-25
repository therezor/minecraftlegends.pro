<nav id="sidebar" aria-label="Main Navigation">
    <div class="content-header">
        <a href="{{ route('index') }}">
            <span class="smini-visible">
               <img src="{{ asset('apple-touch-icon.png') }}" width="24" height="24" alt="...">
            </span>
            <span class="smini-hide fs-5 tracking-wider">
               <img src="{{ asset('img/logo.png') }}" height="24" alt="...">
            </span>
        </a>

        <div>
            <button class="d-lg-none btn btn-sm btn-alt-secondary ms-1" data-toggle="layout"
                    data-action="sidebar_close">
                <i class="fa fa-fw fa-times"></i>
            </button>
        </div>
    </div>

    <div class="js-sidebar-scroll">
        <div class="content-side">
            <ul class="nav-main">
                @can(\App\Enums\Role\Permission::PANEL_DASHBOARD_VIEW->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('panel.index')) active @endif"
                           href="{{ route('panel.index') }}">
                            <i class="nav-main-link-icon fa fa-table-columns"></i>
                            <span class="nav-main-link-name">{{ __('Dashboard') }}</span>
                        </a>
                    </li>
                @endcan

                @can(\App\Enums\Role\Permission::PANEL_SITES_LIST->value)
                    <li class="nav-main-heading">{{ __('Projects') }}</li>

                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('panel.sites.*')) active @endif"
                           href="{{ route('panel.sites.index') }}">
                            <i class="nav-main-link-icon fa fa-file"></i>
                            <span class="nav-main-link-name">{{ trans('panel.sites.title') }}</span>
                        </a>
                    </li>
                @endcan

                @canany([\App\Enums\Role\Permission::PANEL_POSTS_LIST->value, \App\Enums\Role\Permission::PANEL_POST_CATEGORIES_LIST->value])
                    <li class="nav-main-heading">{{ __('Content') }}</li>
                @endcanany

                @can(\App\Enums\Role\Permission::PANEL_POSTS_LIST->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('panel.posts.*')) active @endif"
                           href="{{ route('panel.posts.index') }}">
                            <i class="nav-main-link-icon fa fa-file-lines"></i>
                            <span class="nav-main-link-name">{{ __('Posts') }}</span>
                        </a>
                    </li>
                @endcan

                @can(\App\Enums\Role\Permission::PANEL_POST_CATEGORIES_LIST->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('panel.categories.*')) active @endif"
                           href="{{ route('panel.categories.index') }}">
                            <i class="nav-main-link-icon fa fa-folder"></i>
                            <span class="nav-main-link-name">{{ __('Categories') }}</span>
                        </a>
                    </li>
                @endcan

                @canany([\App\Enums\Role\Permission::PANEL_USERS_LIST->value, \App\Enums\Role\Permission::PANEL_ROLES_LIST->value])
                    <li class="nav-main-heading">{{ __('Access') }}</li>
                @endcanany

                @can(\App\Enums\Role\Permission::PANEL_USERS_LIST->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('panel.users.*')) active @endif"
                           href="{{ route('panel.users.index') }}">
                            <i class="nav-main-link-icon fa fa-users"></i>
                            <span class="nav-main-link-name">{{ __('Users') }}</span>
                        </a>
                    </li>
                @endcan

                @can(\App\Enums\Role\Permission::PANEL_ROLES_LIST->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('panel.roles.*')) active @endif"
                           href="{{ route('panel.roles.index') }}">
                            <i class="nav-main-link-icon fa fa-user-shield"></i>
                            <span class="nav-main-link-name">{{ __('Roles') }}</span>
                        </a>
                    </li>
                @endcan
            </ul>
        </div>
    </div>
</nav>
