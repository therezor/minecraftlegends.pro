<footer id="page-footer" class="bg-body-light">
    <div class="content py-3">
        <div class="row align-items-center fs-sm">
            <div class="col-sm-6 order-sm-2">
                <ul class="nav nav justify-content-center justify-content-sm-end">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('pages.terms') }}">
                            {{ trans('footer.menu.terms') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('pages.privacy') }}">
                            {{ trans('footer.menu.privacy') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('pages.cookies') }}">
                            {{ trans('footer.menu.cookies') }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-6 order-sm-1 py-1 text-center text-sm-start">
                <button type="button" class="btn btn-sm rounded-pill btn-alt-secondary me-2" title="{{ trans('footer.change_theme') }}" data-toggle="layout" data-action="dark_mode_toggle">
                    <i class="fa fa-circle-half-stroke"></i>
                </button>

                &copy; 2022 <a href="{{ route('index') }}" class="h6 text-sm font-bold">{{ config('app.name') }}</a>
                {{ trans('footer.copyright') }}
            </div>
        </div>
    </div>
</footer>
