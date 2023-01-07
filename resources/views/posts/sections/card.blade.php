<div class="col-lg-4 col-md-6">
    <a class="block block-rounded block-link-pop overflow-hidden" href="{{ route('posts.show', $post->slug) }}">
        @if($post->image_id)
            <img class="img-fluid" loading="lazy"  src="{{ imageUrl($post->image_id) }}" alt="{{ $post->title }}">
        @endif
        <div class="block-content">
            <h3 class="h4 mb-1">
                {{ $post->title }}
            </h3>
            <p class="fs-sm text-muted">
                {{ $post->description }}
            </p>
        </div>
    </a>
</div>
