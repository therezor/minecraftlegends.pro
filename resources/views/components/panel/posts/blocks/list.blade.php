<div class="mb-4">
    <div class="input-group">
        <x-form-input required class="w-16 flex-grow-0" :name="'post.blocks.' . $key . '.data.counter'"/>
        <x-form-input required :name="'post.blocks.' . $key . '.title'" placeholder="{{ trans('attributes.title') }}"/>
    </div>
</div>

<div class="mb-4">
    <x-form-textarea class="text-editor" :name="'post.blocks.' . $key . '.description'" rows="3" placeholder="{{ trans('attributes.description') }}"/>
</div>
