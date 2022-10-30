<x-form wire:submit.prevent="submit">
    <div class="row g-5">
        <div class="col-md-8">
            <div class="card mb-4">
                <div class="card-body">
                    <div class="mb-4">
                        <a class="text-muted" data-bs-toggle="collapse" href="#collapse-slug" role="button" aria-expanded="false">
                            <i class="bi bi-link"></i>
                        </a>
                        <x-form-input required name="post.title" data-slug-input="#slug-input" label="{{ trans('attributes.title') }}"/>
                        <div id="collapse-slug" @class(['collapse mt-4', 'show' => $errors->has('post.slug')])>
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">&sol;</span>
                                <x-form-input required class="form-control" name="post.slug" id="slug-input" placeholder="{{trans('attributes.slug') }}"/>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <x-form-textarea required name="post.description" rows="3" label="{{ trans('attributes.description') }}"/>
                    </div>
                </div>
            </div>

            @foreach($post['blocks'] as $key => $block)
                <div class="card mb-4 block-item">
                    <div class="card-header p-2 d-flex flex-row gap-2">
                        @if (!$loop->first)
                            <button class="btn btn-square btn-sm btn-neutral" wire:loading.attr="disabled" wire:target="post.blocks" wire:click.prevent="moveBlockUp('{{ $key }}')"><i class="bi bi-caret-up"></i></button>
                        @endif
                        @if (!$loop->last)
                            <button  class="btn btn-square btn-sm btn-neutral" wire:loading.attr="disabled" wire:target="post.blocks" wire:click.prevent="moveBlockDown('{{ $key }}')"><i class="bi bi-caret-down"></i></button>
                        @endif
                        <button class="btn btn-square btn-sm btn-danger ms-auto" wire:loading.attr="disabled" wire:target="post.blocks" wire:click.prevent="removeBlock('{{ $key }}')"><i class="bi bi-trash"></i></button>
                    </div>
                    <div class="card-body">
                        @include('components.panel.posts.blocks.' . mb_strtolower($block['type']))
                    </div>
                </div>
            @endforeach

            @if(count($post['blocks']) <= 24)
                <div class="row g-5">
                <div class="col-md-3 col-6">
                    <button wire:click.prevent="addBlock('{{ \App\Enums\Block\Type::TEXT->value }}')" wire:loading.attr="disabled" class="form-item-click align-items-center justify-content-center form-control h-24 border-primary-hover">
                        <i class="bi bi-card-text text-muted h1"></i>
                        <span class="text-muted text-sm d-block">{{ __('Text') }}</span>
                    </button>
                </div>

                <div class="col-md-3 col-6">
                    <button wire:click.prevent="addBlock('{{ \App\Enums\Block\Type::LIST->value }}')" wire:loading.attr="disabled" class="mx-auto form-item-click align-items-center justify-content-center form-control h-24 border-primary-hover">
                        <i class="bi bi-card-list text-muted h1"></i>
                        <span class="text-muted text-sm d-block">{{ __('List') }}</span>
                    </button>
                </div>

                <div class="col-md-3 col-6">
                    <button wire:click.prevent="addBlock('{{ \App\Enums\Block\Type::IMAGE->value }}')" wire:loading.attr="disabled" class="mx-auto form-item-click align-items-center justify-content-center form-control h-24 border-primary-hover">
                        <i class="bi bi-card-image text-muted h1"></i>
                        <span class="text-muted text-sm d-block">{{ __('Image') }}</span>
                    </button>
                </div>

                <div class="col-md-3 col-6">
                    <button wire:click.prevent="addBlock('{{ \App\Enums\Block\Type::VIDEO->value }}')" wire:loading.attr="disabled" class="mx-auto form-item-click align-items-center justify-content-center form-control h-24 border-primary-hover">
                        <i class="bi bi bi-play-btn text-muted h1"></i>
                        <span class="text-muted text-sm d-block">{{ __('Video') }}</span>
                    </button>
                </div>
            </div>
            @endif
        </div>
        <div class="col-md-4">
            <div class="card position-sticky top-0">
                <div class="card-body">
                    <div class="mb-4">
                        @include('components.panel.posts.image', ['imageId' => $post['image_id'], 'inputName' => 'post.image_id'])
                    </div>

                    <div class="mb-4">
                        <x-form-select required name="post.category_id" :options="$categoriesSelect" label="{{ trans('attributes.category_id') }}" />
                    </div>

                    <div class="mb-4">
                        <x-form-select name="post.per_page" :options="$perPageSelect" label="{{ trans('attributes.per_page') }}" />
                    </div>

                    <div class="mb-4">
                        <x-form-select required name="post.featured" :options="\App\Enums\Post\Featured::select()" label="{{ trans('attributes.featured') }}" />
                    </div>

                    <div class="mb-4">
                        <x-form-select required name="post.status" :options="\App\Enums\Post\Status::select()" label="{{ trans('attributes.status') }}" />
                    </div>

                    <div class="d-flex flex-row gap-3">
                        <a href="{{ URL::previous() }}" class="btn btn-neutral">{{ trans('crud.cancel') }}</a>
                        <button type="submit" class="ms-auto btn btn-primary">
                            @empty($post['id'])
                                {{ trans('crud.create') }}
                            @else
                                {{ trans('crud.update') }}
                            @endempty
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-form>

@push('scripts')
    <script src="{{ mix('js/post-editor.js') }}"></script>
    @livewireScripts
@endpush
