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
                <li class="nav-main-item">
                    <a class="nav-main-link @if(Route::is('sites.show')) active @endif"
                       href="{{ route('sites.show', $site->sub_domain) }}">
                        <i class="nav-main-link-icon fa fa-table-columns"></i>
                        <span class="nav-main-link-name">{{ trans('sites.sidebar.dashboard') }}</span>
                    </a>
                </li>

                <li class="nav-main-heading">{{ trans('sites.sidebar.content') }}</li>

                <li class="nav-main-item">
                    <a class="nav-main-link @if(Route::is('sites.pages.*')) active @endif"
                       href="#">
                        <i class="nav-main-link-icon fa fa-file"></i>
                        <span class="nav-main-link-name">{{ trans('sites.sidebar.pages') }}</span>
                    </a>
                </li>
                <li class="nav-main-item @if(Route::is('sites.blog.*')) open @endif">
                    <a class="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                        <i class="nav-main-link-icon fa fa-file-lines"></i>
                        <span class="nav-main-link-name">{{ trans('sites.sidebar.blog') }}</span>
                    </a>
                    <ul class="nav-main-submenu">
                        <li class="nav-main-item @if(Route::is('sites.blog.posts.*')) active @endif">
                            <a class="nav-main-link" href="#">
                                <span class="nav-main-link-name">{{ trans('sites.sidebar.posts') }}</span>
                            </a>
                        </li>
                        <li class="nav-main-item @if(Route::is('sites.blog.categories.*')) active @endif">
                            <a class="nav-main-link" href="#">
                                <span class="nav-main-link-name">{{ trans('sites.sidebar.categories') }}</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="nav-main-heading">{{ trans('sites.sidebar.settings') }}</li>

                @can(\App\Enums\Role\Permission::PANEL_POSTS_LIST->value)
                    <li class="nav-main-item">
                        <a class="nav-main-link @if(Route::is('panel.posts.*')) active @endif"
                           href="{{ route('panel.posts.index') }}">
                            <i class="nav-main-link-icon fa fa-file-lines"></i>
                            <span class="nav-main-link-name">{{ __('Posts') }}</span>
                        </a>
                    </li>
                @endcan
            </ul>
        </div>
    </div>
</nav>
