<div class="flex-xl-none h-xl-calc position-sticky top-xl-4">
    {{--    <a href="#" class="btn d-block btn-primary mb-3">--}}
    {{--        <i class="bi bi-plus-circle-dotted me-3"></i>--}}
    {{--        Add story--}}
    {{--    </a>--}}

    <div class="card mb-5">
        <div class="card-body">
            <div class="h5 mb-3">{{ __('Share this article') }}</div>
            <div class="row g-3">
                <div class="col-4">
                    <a class="btn d-block btn-facebook"
                       href="https://www.facebook.com/sharer/sharer.php?u=https://css-pro.ru"
                       rel="nofollow" target="_blank" title="Share with Facebook">
                        <i class="bi bi-facebook"></i>
                    </a>
                </div>
                <div class="col-4">
                    <a class="btn d-block btn-twitter"
                       href="https://twitter.com/intent/tweet?url=https://css-pro.ru&text=custom share title"
                       rel="nofollow"
                       target="_blank" title="Share on Twitter">
                        <i class="bi bi-twitter"></i>
                    </a>
                </div>
                <div class="col-4">
                    <a class="btn d-block btn-pinterest"
                       href="https://pinterest.com/pin/create/button/?url=https://css-pro.ru&media=https://css-pro.ru/_nw/3/37167338.png"
                       rel="nofollow" target="_blank" title="Share on Pinterest">
                        <i class="bi bi-pinterest"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>


    <div class="card mb-5">
        <div class="card-body">
            <div class="h4 mb-3">{{ __('What do you think?') }}</div>
            <div class="row g-3">
                <div class="col-4">
                    <a class="btn d-block btn-neutral text-opacity-100-hover text-success-hover" href="#"
                       title="Vote up">
                        <i class="bi bi-hand-thumbs-up"></i>
                    </a>
                </div>
                <div class="col-4">
                    <div class="btn d-block btn-success disabled">215</div>
                </div>
                <div class="col-4">
                    <a class="btn d-block btn-neutral text-opacity-100-hover text-danger-hover" href="#"
                       title="Vote down">
                        <i class="bi bi-hand-thumbs-down"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="card mb-5">
        <div class="card-body">
            <div class="vstack gap-3">
                <div class="d-flex align-items-center">
                    <i class="bi bi-person me-2 text-muted"></i>
                    {{ $post->author->name }}
                </div>

                <div class="d-flex align-items-center">
                    <i class="bi bi-clock me-2 text-muted"></i>
                    {{ $post->created_at->diffForHumans() }}
                </div>

                <div class="d-flex align-items-center">
                    <i class="bi bi-folder me-2 text-muted"></i>
                    <a href="{{ route('categories.show', $post->category->slug) }}">{{ $post->category->name }}</a>
                </div>
            </div>
        </div>
    </div>


    <div class="card mb-3">
        <a href="/content">
            <img class="card-img-top"
                 src="https://carsbasics.com/wp-content/uploads/2022/07/How-To-Buy-And-Sell-Repossessed-Cars-640x385.jpg"
                 alt="Card image cap">
        </a>
        <div class="card-body p-3">
            <a href="/content">
                <h4 class="text-primary-hover">What to Give On Father’s Day</h4>
            </a>
        </div>
    </div>

</div>

