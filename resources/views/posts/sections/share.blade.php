<button type="button" class="btn btn-alt-secondary dropdown-toggle" id="dropdown-blog-story" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="fa fa-share-alt me-1"></i> {{ __('Share') }}
</button>
<div class="dropdown-menu dropdown-menu-end fs-sm" aria-labelledby="dropdown-blog-story">
    <a class="dropdown-item" rel="nofollow" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={{ route('posts.show', $post->slug) }}">
        <i class="fab fa-fw fa-facebook me-1"></i> {{ __('Share on Facebook') }}
    </a>
    <a class="dropdown-item" rel="nofollow" target="_blank" href="https://twitter.com/intent/tweet?url={{ route('posts.show', $post->slug) }}&text={{ $post->title }}">
        <i class="fab fa-fw fa-twitter me-1"></i> {{ __('Share on Twitter') }}
    </a>
    <a class="dropdown-item" rel="nofollow" target="_blank" href="https://pinterest.com/pin/create/button/?url={{ route('posts.show', $post->slug) }}&media={{ $post->image_id ? imageUrl($post->image_id) : '' }}">
        <i class="fab fa-fw fa-pinterest me-1"></i> {{ __('Share on Pinterest') }}
    </a>
</div>
