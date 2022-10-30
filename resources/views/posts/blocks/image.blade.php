@if($block->title)
    <h2 class="mb-4 @if(!$loop->first) mt-8 @endif">{{ $block->title }}</h2>
@endif

<figure class="mb-4">
    <img class="card-img" loading="lazy" src="{{ imageUrl($block->image_id) }}" alt="{{ $block->data['alt'] ?? $block->title }}">
    @if(isset($block->data['caption']))
        <figcaption class="text-muted text-sm text-center">
            {{ $block->data['caption'] }}
        </figcaption>
    @endif
</figure>

@if($block->description)
    <div class="mb-4">
        {!! $block->description !!}
    </div>
@endif
