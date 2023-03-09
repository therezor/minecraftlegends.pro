<header id="page-header">
    <div class="content-header">
        <div class="d-flex align-items-center">
            <button type="button" class="btn btn-sm btn-alt-secondary me-2 d-lg-none" data-toggle="layout"
                    data-action="sidebar_toggle">
                <i class="fa fa-fw fa-bars"></i>
            </button>

            <button type="button" class="btn btn-sm btn-alt-secondary me-2 d-none d-lg-inline-block"
                    data-toggle="layout" data-action="sidebar_mini_toggle">
                <i class="fa fa-fw fa-ellipsis-v"></i>
            </button>
        </div>

        <div class="d-flex align-items-center">
            <div class="dropdown d-inline-block ms-2">
                <button type="button" class="btn btn-sm btn-alt-secondary" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-fw fa-user"></i>
                    <span class="d-none d-sm-inline-block ms-2">{{ Str::limit(auth()->user()->name, 9) }}</span>
                    <i class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
                     aria-labelledby="page-header-user-dropdown" style="">
                    <div class="p-3 text-center bg-body-light border-bottom rounded-top">
                        <p class="mt-2 mb-0 fw-medium">{{ auth()->user()->name }}</p>
                        <p class="mb-0 text-muted fs-sm fw-medium">{{ auth()->user()->role->name }}</p>
                    </div>
                    @can(\App\Enums\Role\Permission::ADMIN_DASHBOARD_VIEW->value)
                        <div class="p-2">
                            <a class="dropdown-item fs-sm fw-medium" href="{{ route('admin.index') }}">
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
        </div>
    </div>
</header>
