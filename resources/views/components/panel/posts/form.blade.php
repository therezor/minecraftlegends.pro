<x-form wire:submit.prevent="submit">
    <div class="row g-5">
        <div class="col-md-8">
            <div class="card mb-4">
                <div class="card-body">
                    <div class="mb-4">
                        <x-form-input required name="entity.title" data-slug-input="#auto_id_entity\.slug" label="{{ trans('attributes.title') }}"/>
                    </div>

                    <div class="mb-4">
                        <x-form-input required name="entity.slug" label="{{trans('attributes.slug') }}"/>
                    </div>

                    <div class="mb-4">
                        <x-form-textarea required name="entity.description" rows="3" label="{{ trans('attributes.description') }}"/>
                    </div>
                </div>
            </div>

            @foreach($entity->blocks as $key => $block)
                <div class="card mb-4">
                    <div class="card-header p-2 d-flex flex-row gap-2">
                        <button class="btn btn-square btn-sm btn-neutral"><i class="bi bi-caret-up"></i></button>
                        <button class="btn btn-square btn-sm btn-neutral"><i class="bi bi-caret-down"></i></button>
                        <button class="btn btn-square btn-sm btn-danger ms-auto"><i class="bi bi-trash"></i></button>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <x-form-input required :name="'entity.blocks.' . $key . '.title'" data-slug-input="#auto_id_entity\.slug" placeholder="{{ trans('attributes.title') }}"/>
                        </div>

                        <div class="mb-4">
                            <x-form-textarea required :name="'entity.blocks.' . $key . '.description'" rows="3" placeholder="{{ trans('attributes.description') }}"/>
                        </div>
                    </div>
                </div>
            @endforeach

            <div class="hstack gap-4">
                <div class="form-item-checkable">
                    <button wire:click.prevent="addTextBlock()" wire:loading.attr="disabled" class="form-item-click align-items-center justify-content-center form-control w-24 h-24 border-primary-hover">
                        <i class="bi bi-card-text text-muted h1"></i>
                        <span class="text-muted text-sm d-block">Text</span>
                    </button>
                </div>

                <div class="form-item-checkable">
                    <button class="form-item-click align-items-center justify-content-center form-control w-24 h-24 border-primary-hover">
                        <i class="bi bi-card-list text-muted h1"></i>
                        <span class="text-muted text-sm d-block">List</span>
                    </button>
                </div>

                <div class="form-item-checkable">
                    <button class="form-item-click align-items-center justify-content-center form-control w-24 h-24 border-primary-hover">
                        <i class="bi bi-card-image text-muted h1"></i>
                        <span class="text-muted text-sm d-block">Image</span>
                    </button>
                </div>

                <div class="form-item-checkable">
                    <button class="form-item-click align-items-center justify-content-center form-control w-24 h-24 border-primary-hover">
                        <i class="bi bi bi-play-btn text-muted h1"></i>
                        <span class="text-muted text-sm d-block">Video</span>
                    </button>
                </div>

            </div>

        </div>
        <div class="col-md-4">
            <div class="card position-sticky top-0">
                <div class="card-body">
                    <div class="mb-4">
                        @if($entity->image_id)
                            <div class="ratio ratio-16x9">
                                <img src="{{ $entity->image->url }}" alt="{{ __('Uploaded image') }}" class="rounded fit-cover">
                            </div>
                            <div class="btn btn-neutral btn-sm mt-2" wire:click="removeImage" wire:loading.attr="disabled">
                                <i class="bi bi-x-circle-fill"></i> {{ trans('crud.destroy')  }}
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
                        <x-form-select required name="entity.status" :options="['' => ''] + \App\Enums\Post\Status::select()" label="{{ trans('attributes.status') }}" />
                    </div>

                    <div class="d-flex flex-row gap-3">
                        <a href="{{ URL::previous() }}" class="btn btn-neutral">{{ trans('crud.cancel') }}</a>
                        <button type="submit" class="ms-auto btn btn-primary">{{ trans('crud.create') }}</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-form>
