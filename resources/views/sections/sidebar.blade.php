<div class="h5 mb-3">{{ __('Editor choice') }}</div>

@foreach($editorChoice as $post)
    <div class="card mb-5">
        @if($post->image_id)
            <a href="{{ route('posts.show', $post->slug) }}" class="ratio ratio-16x9">
                <img class="card-img-top" loading="lazy" src="{{ imageUrl($post->image_id) }}" alt="{{ $post->title }}">
            </a>
        @endif
        <div class="card-body p-3">
            <a href="{{ route('posts.show', $post->slug) }}">
                <h4 class="text-primary-hover">{{ $post->title }}</h4>
            </a>
        </div>
    </div>
@endforeach

<div class="h5 mb-3">{{ __('Featured') }}</div>

@foreach($featured as $post)
    <div class="card mb-5">
        @if($post->image_id)
            <a href="{{ route('posts.show', $post->slug) }}" class="ratio ratio-16x9">
                <img class="card-img-top" loading="lazy" src="{{ imageUrl($post->image_id) }}" alt="{{ $post->title }}">
            </a>
        @endif
        <div class="card-body p-3">
            <a href="{{ route('posts.show', $post->slug) }}">
                <h4 class="text-primary-hover">{{ $post->title }}</h4>
            </a>
        </div>
    </div>
@endforeach


