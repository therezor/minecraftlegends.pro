@if($imageId)
    <div class="ratio ratio-16x9 position-relative">
        <div>
            <img src="{{ imageUrl($imageId) }}" alt="{{ __('Uploaded image') }}" class="rounded fit-cover">
            <button class="btn btn-danger btn-sm btn-square position-absolute top-1 end-1" wire:click.prevent="removeImage('{{ $inputName }}')" wire:loading.attr="disabled">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    </div>

@else
    <div wire:loading.class="pe-none" wire:target="{{ $inputName }}" class="rounded bg-secondary bg-opacity-10 bg-opacity-20-hover border-2 border-secondary border-dashed  position-relative">
        <div class="d-flex justify-content-center px-5 py-10">
            <label for="{{ $inputName }}" class="position-absolute w-full h-full top-0 start-0 cursor-pointer"></label>
            <div class="text-center">
                <div class="text-2xl "><i class="bi bi-cloud-upload-fill"></i></div>
                <div class="text-sm mt-3">
                    <p class="font-semibold" wire:loading.class="d-none" wire:target="{{ $inputName }}">{{ __('Upload image') }}</p>
                    <p class="font-semibold d-none" wire:loading.class.remove="d-none" wire:target="{{ $inputName }}">{{ __('Uploading...') }}</p>
                </div>
                <p class="text-xs ">{{ __('PNG, JPG, GIF up to 10MB') }}</p>
            </div>
        </div>
    </div>
@endif
<x-form-input id="{{ $inputName }}" name="{{ $inputName }}" type="file" accept=".png,.jpg,.jpeg,.webp,.gif" class="visually-hidden" />
