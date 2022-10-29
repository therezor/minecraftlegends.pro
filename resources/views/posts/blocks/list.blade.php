<div class="d-flex align-items-center mb-4 @if(!$loop->first) mt-8 @endif">
    <div class="btn btn-square btn-primary disabled text-lg me-2">{{ $block->data['counter'] }}</div>
    <h2>
        {{ $block->title }}
    </h2>
</div>

@if($block->description)
    <div class="mb-4">
        {!! $block->description !!}
    </div>
@endif
