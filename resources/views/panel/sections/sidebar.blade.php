<nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-light border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
    <div class="container-fluid">
        <!-- Toggler -->
        <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Brand -->
        <a class="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="/">
            <img src="https://preview.webpixels.io/web/img/logos/clever-primary.svg" alt="...">
        </a>
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidebarCollapse">
            <!-- Navigation -->
            <ul class="navbar-nav">
                @can(\App\Enums\Roles\Permission::DASHBOARD_VIEW->value)
                <li class="nav-item">
                    <a class="nav-link @if(Route::is('panel.index')) active @endif" href="{{ route('panel.index') }}">
                        <i class="bi bi-house"></i> {{ __('Dashboard') }}
                    </a>
                </li>
                @endcan

                @can(\App\Enums\Roles\Permission::POSTS_LIST->value)
                    <li class="nav-item">
                        <a class="nav-link @if(Route::is('panel.posts.*')) active @endif" href="{{ route('panel.posts.index') }}">
                            <i class="bi bi-journals"></i> {{ __('Posts') }}
                        </a>
                    </li>
                @endcan

                @can(\App\Enums\Roles\Permission::CATEGORIES_LIST->value)
                    <li class="nav-item">
                        <a class="nav-link @if(Route::is('panel.categories.*')) active @endif" href="{{ route('panel.categories.index') }}">
                            <i class="bi bi-folder"></i> {{ __('Categories') }}
                        </a>
                    </li>
                @endcan

                @can(\App\Enums\Roles\Permission::USERS_LIST->value)
                <li class="nav-item">
                    <a class="nav-link @if(Route::is('panel.users.*')) active @endif" href="{{ route('panel.users.index') }}">
                        <i class="bi bi-people"></i> {{ __('Users') }}
                    </a>
                </li>
                @endcan

                @can(\App\Enums\Roles\Permission::ROLES_LIST->value)
                <li class="nav-item">
                    <a class="nav-link @if(Route::is('panel.roles.*')) active @endif" href="{{ route('panel.roles.index') }}">
                        <i class="bi bi-shield-lock"></i> {{ __('Roles') }}
                    </a>
                </li>
                @endcan
            </ul>
            <!-- Divider -->
            <hr class="navbar-divider my-5 opacity-20">
            <!-- Push content down -->
            <div class="mt-auto"></div>
            <div class="navbar-nav">
                <form method="POST" class="nav-item" action="{{ route('logout') }}">
                    @csrf
                    <button class="nav-link nav-logout w-full text-start btn-link" type="submit">
                        <i class="bi bi-box-arrow-left"></i> {{ __('Log out') }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</nav>
