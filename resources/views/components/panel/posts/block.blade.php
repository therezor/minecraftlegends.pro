<div>
    <x-form-input required name="title" label="{{ __('Title') }}" />
</div>

<div>
    <x-form-input required name="slug" label="{{ __('Slug') }}" />
</div>

<div>
    <x-form-input name="videoUrl" label="{{ __('Video Url') }}" />
</div>

<div>
    @if ($imageUrl)
        <div class="ratio ratio-16x9">
            <img src="{{ $imageUrl }}" alt="{{ __('Uploaded image') }}" class="rounded fit-cover">
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

<div>
    <x-form-textarea required name="content" rows="6" label="{{ __('Content') }}" />
</div>
