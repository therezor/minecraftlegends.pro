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
                    <a class="nav-main-link @if(Route::is('panel.show')) active @endif"
                       href="{{ route('panel.show', $site->hostname) }}">
                        <i class="nav-main-link-icon fa fa-house"></i>
                        <span class="nav-main-link-name">{{ trans('panel.sidebar.home') }}</span>
                    </a>
                </li>
                <li class="nav-main-item">
                    <a class="nav-main-link @if(Route::is('panel.pages.*')) active @endif"
                       href="{{ route('panel.pages.index', $site->hostname) }}">
                        <i class="nav-main-link-icon fa fa-file"></i>
                        <span class="nav-main-link-name">{{ trans('panel.sidebar.pages') }}</span>
                    </a>
                </li>
                <li class="nav-main-item">
                    <a class="nav-main-link @if(Route::is('panel.design')) active @endif"
                       href="#">
                        <i class="nav-main-link-icon fa fa-palette"></i>
                        <span class="nav-main-link-name">{{ trans('panel.sidebar.design') }}</span>
                    </a>
                </li>
                <li class="nav-main-item @if(Route::is('panel.blog-*')) open @endif">
                    <a class="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                        <i class="nav-main-link-icon fa fa-file-lines"></i>
                        <span class="nav-main-link-name">{{ trans('panel.sidebar.blog') }}</span>
                    </a>
                    <ul class="nav-main-submenu">
                        <li class="nav-main-item @if(Route::is('panel.blog-posts.*')) active @endif">
                            <a class="nav-main-link" href="{{ route('panel.blog-posts.index', $site->hostname) }}">
                                <span class="nav-main-link-name">{{ trans('panel.sidebar.posts') }}</span>
                            </a>
                        </li>
                        <li class="nav-main-item @if(Route::is('panel.blog-categories.*')) active @endif">
                            <a class="nav-main-link" href="{{ route('panel.blog-categories.index', $site->hostname) }}">
                                <span class="nav-main-link-name">{{ trans('panel.sidebar.categories') }}</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="nav-main-item @if(Route::is('panel.settings.*')) open @endif">
                    <a class="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                        <i class="nav-main-link-icon fa fa-gear"></i>
                        <span class="nav-main-link-name">{{ trans('panel.sidebar.settings') }}</span>
                    </a>
                    <ul class="nav-main-submenu">
                        <li class="nav-main-item @if(Route::is('panel.settings.domain')) active @endif">
                            <a class="nav-main-link" href="#">
                                <span class="nav-main-link-name">{{ trans('panel.sidebar.domain_name') }}</span>
                            </a>
                        </li>
                        <li class="nav-main-item @if(Route::is('panel.settings.advanced')) active @endif">
                            <a class="nav-main-link" href="#">
                                <span class="nav-main-link-name">{{ trans('panel.sidebar.advanced') }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
