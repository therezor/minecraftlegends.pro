<footer class="py-5 container-xl">
    <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
            <div class="copyright text-sm text-center text-md-start">
                &copy; 2022 <a href="{{ route('index') }}" class="h6 text-sm font-bold">{{ config('app.name') }}</a>
                {{ __('All rights reserved.') }}
            </div>
        </div>
        <div class="col-md-6">
            <ul class="nav justify-content-center justify-content-md-end mt-3 mt-md-0 mx-n3">
                <li class="nav-item">
                    <a class="nav-link text-opacity-75" href="{{ route('pages.show', 'terms') }}">
                        {{ __('Terms') }}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-opacity-75" href="{{ route('pages.show', 'privacy') }}">
                        {{ __('Privacy') }}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-opacity-75" href="{{ route('pages.show', 'cookies') }}">
                        {{ __('Cookies') }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</footer>
