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
                @can(\App\Enums\Role\Permission::ADMIN_DASHBOARD_VIEW->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('admin.index')) active @endif"
                           href="{{ route('admin.index') }}">
                            <i class="nav-main-link-icon fa fa-table-columns"></i>
                            <span class="nav-main-link-name">{{ __('Dashboard') }}</span>
                        </a>
                    </li>
                @endcan

                @can(\App\Enums\Role\Permission::ADMIN_SITES_LIST->value)
                    <li class="nav-main-heading">{{ __('Projects') }}</li>

                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('admin.sites.*')) active @endif"
                           href="{{ route('admin.sites.index') }}">
                            <i class="nav-main-link-icon fa fa-file"></i>
                            <span class="nav-main-link-name">{{ trans('admin.sites.title') }}</span>
                        </a>
                    </li>
                @endcan

                @canany([\App\Enums\Role\Permission::ADMIN_POSTS_LIST->value, \App\Enums\Role\Permission::ADMIN_POST_CATEGORIES_LIST->value])
                    <li class="nav-main-heading">{{ __('Content') }}</li>
                @endcanany

                @can(\App\Enums\Role\Permission::ADMIN_POSTS_LIST->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('admin.posts.*')) active @endif"
                           href="{{ route('admin.posts.index') }}">
                            <i class="nav-main-link-icon fa fa-file-lines"></i>
                            <span class="nav-main-link-name">{{ __('Posts') }}</span>
                        </a>
                    </li>
                @endcan

                @can(\App\Enums\Role\Permission::ADMIN_POST_CATEGORIES_LIST->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('admin.categories.*')) active @endif"
                           href="{{ route('admin.categories.index') }}">
                            <i class="nav-main-link-icon fa fa-folder"></i>
                            <span class="nav-main-link-name">{{ __('Categories') }}</span>
                        </a>
                    </li>
                @endcan

                @canany([\App\Enums\Role\Permission::ADMIN_USERS_LIST->value, \App\Enums\Role\Permission::ADMIN_ROLES_LIST->value])
                    <li class="nav-main-heading">{{ __('Access') }}</li>
                @endcanany

                @can(\App\Enums\Role\Permission::ADMIN_USERS_LIST->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('admin.users.*')) active @endif"
                           href="{{ route('admin.users.index') }}">
                            <i class="nav-main-link-icon fa fa-users"></i>
                            <span class="nav-main-link-name">{{ __('Users') }}</span>
                        </a>
                    </li>
                @endcan

                @can(\App\Enums\Role\Permission::ADMIN_ROLES_LIST->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('admin.roles.*')) active @endif"
                           href="{{ route('admin.roles.index') }}">
                            <i class="nav-main-link-icon fa fa-user-shield"></i>
                            <span class="nav-main-link-name">{{ __('Roles') }}</span>
                        </a>
                    </li>
                @endcan
            </ul>
        </div>
    </div>
</nav>
