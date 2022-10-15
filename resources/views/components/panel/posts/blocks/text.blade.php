<div class="mb-4">
    <x-form-input required :name="'post.blocks.' . $key . '.title'" placeholder="{{ trans('attributes.title') }}"/>
</div>

<div class="mb-4">
    <x-form-textarea class="text-editor" :name="'post.blocks.' . $key . '.description'" rows="3" placeholder="{{ trans('attributes.description') }}"/>
</div>
