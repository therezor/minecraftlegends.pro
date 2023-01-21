<div class="content py-3">
    <div class="d-lg-none">
        <button type="button" class="btn w-100 btn-alt-secondary d-flex justify-content-between align-items-center" data-toggle="class-toggle" data-target="#main-navigation" data-class="d-none">
            {{ __('Categories') }}
            <i class="fa fa-bars"></i>
        </button>
    </div>

    <div id="main-navigation" class="d-none d-lg-block mt-2 mt-lg-0">
        <ul class="nav-main nav-main-horizontal nav-main-hover">
            @foreach($categories as $category)
                <li class="nav-main-item">
                    <a class="nav-main-link @if(Route::is('categories.show') && Route::input('slug')  === $category->slug) active @endif" href="{{ route('categories.show', $category->slug) }}">
                        <span class="nav-main-link-name">{{ $category->name }}</span>
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
</div>
