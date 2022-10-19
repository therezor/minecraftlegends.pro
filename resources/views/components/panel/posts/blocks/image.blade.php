@if($block['image_id'])
    <div class="mb-4">
        <x-form-input :name="'post.blocks.' . $key . '.title'" placeholder="{{ trans('attributes.title') }}"/>
    </div>
@endif

@include('components.panel.posts.image', ['imageId' => $block['image_id'] ?? null, 'inputName' => 'post.blocks.' . $key . '.image_id'])
@if($block['image_id'])
    <div class="text-center my-2">
        <a wire:ignore.self class="text-muted" data-bs-toggle="collapse" href="#collapse-more-{{ $key }}" role="button" aria-expanded="false">
            {{ trans('crud.more') }}
        </a>
    </div>

    <div wire:ignore.self id="collapse-more-{{ $key }}" class="collapse">
        <x-form-input class="mb-4" :name="'post.blocks.' . $key . '.data.caption'" placeholder="{{ trans('attributes.caption') }}"/>
        <x-form-input class="mb-4" :name="'post.blocks.' . $key . '.data.alt'" placeholder="{{ trans('attributes.alt') }}"/>

        <x-form-textarea class="text-editor" :name="'post.blocks.' . $key . '.description'" rows="3" placeholder="{{ trans('attributes.description') }}"/>
    </div>
@endif
