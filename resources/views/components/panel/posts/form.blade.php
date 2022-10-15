<x-form wire:submit.prevent="submit">
    <div class="row g-5">
        <div class="col-md-8">
            <div class="card mb-4">
                <div class="card-body">
                    <div class="mb-4">
                        <x-form-input required name="post.title" data-slug-input="#auto_id_entity\.slug" label="{{ trans('attributes.title') }}"/>
                    </div>

                    <div class="mb-4">
                        <x-form-input required name="post.slug" label="{{trans('attributes.slug') }}"/>
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
                        @include('components.panel.posts.blocks.' . $block['type'])
                    </div>
                </div>
            @endforeach

            <div class="row g-5">
                <div class="col-md-3 col-6">
                    <button wire:click.prevent="addBlock('{{ \App\Enums\Block\Type::TEXT->value }}')" wire:loading.attr="disabled" class="form-item-click align-items-center justify-content-center form-control h-24 border-primary-hover">
                        <i class="bi bi-card-text text-muted h1"></i>
                        <span class="text-muted text-sm d-block">Text</span>
                    </button>
                </div>

                <div class="col-md-3 col-6">
                    <button wire:click.prevent="addBlock('{{ \App\Enums\Block\Type::LIST->value }}')" wire:loading.attr="disabled" class="mx-auto form-item-click align-items-center justify-content-center form-control h-24 border-primary-hover">
                        <i class="bi bi-card-list text-muted h1"></i>
                        <span class="text-muted text-sm d-block">List</span>
                    </button>
                </div>

                <div class="col-md-3 col-6">
                    <button wire:click.prevent="addBlock('{{ \App\Enums\Block\Type::IMAGE->value }}')" wire:loading.attr="disabled" class="mx-auto form-item-click align-items-center justify-content-center form-control h-24 border-primary-hover">
                        <i class="bi bi-card-image text-muted h1"></i>
                        <span class="text-muted text-sm d-block">Image</span>
                    </button>
                </div>

                <div class="col-md-3 col-6">
                    <button wire:click.prevent="addBlock('{{ \App\Enums\Block\Type::VIDEO->value }}')" wire:loading.attr="disabled" class="mx-auto form-item-click align-items-center justify-content-center form-control h-24 border-primary-hover">
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
                        @include('components.panel.posts.image', ['imageId' => $post['image_id'], 'inputName' => 'post.image_id'])
                    </div>

                    <div class="mb-4">
                        <x-form-select name="categoryId" class="multi-select" :options="$categoriesSelect" />
                    </div>

                    <div class="mb-4">
                        <x-form-select required name="post.status" :options="['' => ''] + \App\Enums\Post\Status::select()" label="{{ trans('attributes.status') }}" />
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

@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            function initializeEditor(el) {
                if (el.classList.contains('block-item')) {
                    [].slice.call(el.querySelectorAll('.text-editor')).map(function (editorTriggerEl) {
                        if (ClassicEditor !== undefined) {
                            editorTriggerEl.required = false;
                            ClassicEditor.create(editorTriggerEl, {
                                toolbar: {
                                    items: [
                                        'heading', '|',
                                        'bold', 'italic',  'link', 'bulletedList', 'numberedList', '|',
                                        'outdent', 'indent', '|',
                                        'undo', 'redo', 'removeFormat'
                                    ],
                                    shouldNotGroupWhenFull: true
                                },
                                heading: {
                                    options: [
                                        { model: 'paragraph', title: 'Paragraph' },
                                        { model: 'heading3', view: 'h3', title: 'Heading 1', class: 'ck-heading_heading1' },
                                        { model: 'heading4', view: 'h4', title: 'Heading 2', class: 'ck-heading_heading2' },
                                        { model: 'heading5', view: 'h5', title: 'Heading 3', class: 'ck-heading_heading3' }
                                    ]
                                }
                            }).then( editor => {
                                editor.model.document.on('change:data', async () => {
                                    editorTriggerEl.value = editor.getData();
                                    editorTriggerEl.dispatchEvent(new Event('input'));
                                });
                            });
                        }
                    });
                }
            }

            Livewire.hook('element.initialized', (el, component) => {
                initializeEditor(el);
            });
            Livewire.hook('element.updated', (el, component) => {
                initializeEditor(el);
            })
        });
    </script>
@endpush
