@if($block->title)
    <h2 class="mb-4 @if(!$loop->first) mt-8 @endif">{{ $block->title }}</h2>
@endif

<div class="card-img overflow-hidden mb-4">
    <div class="ratio ratio-16x9">
        {!! $block->data['embed_code'] !!}
    </div>
</div>

@if($block->description)
    <div class="mb-4">
        {!! $block->description !!}
    </div>
@endif
