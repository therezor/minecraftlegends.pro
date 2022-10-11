<x-form wire:submit.prevent="submit">
    <div class="row">
        <div class="col-md-8">
            <div class="mb-4">
                <x-form-input required name="entity.title" label="{{ __('Title') }}" />
            </div>

            <div class="mb-4">
                <x-form-input required name="entity.slug" label="{{ __('Slug') }}" />
            </div>

            <div class="mb-4">
                <x-form-textarea name="entity.description" rows="3" label="{{ __('Description') }}" />
            </div>

            <hr>
{{--            @foreach($blocks as $block)--}}
{{--                {{ var_dump($block) }}--}}
{{--                @livewire('panel.posts.block')--}}
{{--            @endforeach--}}
        </div>
        <div  class="col-md-4">
            <div class="mb-4">
                @if($entity->image_id)
                    <div class="ratio ratio-16x9">
                        <img src="{{ $entity->image->url }}" alt="{{ __('Uploaded image') }}" class="rounded fit-cover">
                    </div>
                    <div class="btn btn-neutral btn-sm mt-2" wire:click="removeImage" wire:loading.attr="disabled">
                        <i class="bi bi-x-circle-fill"></i> {{ __('Delete') }}
                    </div>
                @else
                    <div wire:loading.class="pe-none" wire:target="imageUpload" class="rounded bg-secondary bg-opacity-10 bg-opacity-20-hover border-2 border-secondary border-dashed  position-relative">
                        <div class="d-flex justify-content-center px-5 py-10">
                            <label for="image-upload" class="position-absolute w-full h-full top-0 start-0 cursor-pointer"></label>
                            <div class="text-center">
                                <div class="text-2xl "><i class="bi bi-cloud-upload-fill"></i></div>
                                <div class="text-sm mt-3">
                                    <p class="font-semibold" wire:loading.class="d-none" wire:target="imageUpload">{{ __('Upload image') }}</p>
                                    <p class="font-semibold d-none" wire:loading.class.remove="d-none" wire:target="imageUpload">{{ __('Uploading...') }}</p>
                                </div>
                                <p class="text-xs ">{{ __('PNG, JPG, GIF up to 10MB') }}</p>
                            </div>
                        </div>
                    </div>
                @endif
                <x-form-input wire:model="imageUpload" id="image-upload" name="imageUpload" type="file" class="visually-hidden" />
            </div>

            <div class="mb-4">
                <x-form-select name="categoryId" :options="['' => ''] + $categoriesSelect" />
            </div>

            <div class="mb-4">
                <x-form-select required name="entity.status" :options="['' => ''] + \App\Enums\Post\Status::select()" label="{{ __('Status') }}" />
            </div>

            <div class="d-flex flex-row gap-3">
                <a href="{{ URL::previous() }}" class="btn btn-neutral">{{ trans('crud.cancel') }}</a>
                <button type="submit" class="ms-auto btn btn-primary">{{ trans('crud.create') }}</button>
            </div>

        </div>
    </div>
</x-form>
