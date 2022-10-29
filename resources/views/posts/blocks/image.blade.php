@if($block->title)
    <h2 class="mb-4 @if(!$loop->first) mt-8 @endif">{{ $block->title }}</h2>
@endif

<img class="card-img @if(!isset($block->data['caption'])) mb-4 @endif" src="{{ imageUrl($block->image_id) }}" alt="{{ $block->data['alt'] ?? $block->title }}">
@if(isset($block->data['caption']))
    <div class="text-muted text-sm text-center mb-4">
        {{ $block->data['caption'] }}
    </div>
@endif

@if($block->description)
    <div class="mb-4">
        {!! $block->description !!}
    </div>
@endif
