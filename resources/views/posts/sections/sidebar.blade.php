<div class="flex-xl-none h-xl-calc position-sticky top-xl-4">

    <div class="card mb-5">
        <div class="card-body">
            <div class="h5 mb-3">{{ __('Share this article') }}</div>
            <div class="row g-3">
                <div class="col-4">
                    <a class="btn d-block btn-facebook"
                       href="https://www.facebook.com/sharer/sharer.php?u={{ route('posts.show', $post->slug) }}"
                       rel="nofollow" target="_blank" title="{{ __('Share on Facebook') }}">
                        <i class="bi bi-facebook"></i>
                    </a>
                </div>
                <div class="col-4">
                    <a class="btn d-block btn-twitter"
                       href="https://twitter.com/intent/tweet?url={{ route('posts.show', $post->slug) }}&text={{ $post->title }}"
                       rel="nofollow"
                       target="_blank" title="{{ __('Share on Twitter') }}">
                        <i class="bi bi-twitter"></i>
                    </a>
                </div>
                <div class="col-4">
                    <a class="btn d-block btn-pinterest"
                       href="https://pinterest.com/pin/create/button/?url={{ route('posts.show', $post->slug) }}&media={{ $post->image_id ? imageUrl($post->image_id) : '' }}"
                       rel="nofollow" target="_blank" title="{{ __('Share on Pinterest') }}">
                        <i class="bi bi-pinterest"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="card mb-5">
        <div class="card-body">
            <div class="h4 mb-3">{{ __('What do you think?') }}</div>
            @include('posts.sections.vote')
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
</div>

