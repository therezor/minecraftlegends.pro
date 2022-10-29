@if($block->title)
    <h2 class="mb-4 @if(!$loop->first) mt-8 @endif">{{ $block->title }}</h2>
@endif

@if($block->description)
    <div class="mb-4">
        {!! $block->description !!}
    </div>
@endif
