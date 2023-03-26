<div wire:sortable.item="{{ $block['id'] }}" wire:key="block-{{ $block['id'] }}" class="block block-rounded mb-2">
    <div class="block-content p-2">
        <div class="d-flex align-items-center">
            <div wire:sortable.handle class="text-secondary me-2 drag">
                <i class="fa fa-fw fa-grip-vertical"></i>
            </div>

            <div class="col align-items-center text-truncate">
                <a href="#" wire:click.prevent="selectBlock({{ $key }})" class="fw-semibold">
                    {{ $block['name'] }}
                </a>
            </div>

            <div>
                <small class="form-check form-switch mb-0">
                    {{ Form::checkbox('is_enabled', true, $block['is_enabled'], ['wire:change' => 'toggleBlock('. $key . ')', 'class' => 'form-check-input']) }}
                </small>
            </div>
            <div>
                <button class="btn btn-sm btn-link text-secondary fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-fw fa-ellipsis"></i>
                </button>
                <div class="dropdown-menu fs-sm">
                    <a href="#page-block-{{ $block['id'] }}" data-bs-toggle="collapse" aria-expanded="false" aria-controls="page-block-{{ $block['id'] }}" title="{{ trans('crud.edit') }}" class="dropdown-item fs-sm fw-medium">
                        <i class="fa fa-fw fa-pencil-alt"></i> {{ trans('crud.edit') }}
                    </a>

                    <a href="#" wire:click.prevent="duplicateBlock({{ $key }})" wire:loading.attr="disabled" class="dropdown-item fs-sm fw-medium">
                        <i class="fa fa-fw fa-copy"></i> {{ trans('crud.duplicate') }}
                    </a>

                    <a href="#" onclick="return confirm('{{ trans('crud.confirmation') }}') || event.stopImmediatePropagation();" wire:click.prevent="removeBlock({{ $key }})" wire:loading.attr="disabled" title="{{ trans('crud.destroy') }}" class="dropdown-item fs-sm fw-medium">
                        <i class="fa fa-fw fa-trash"></i> {{ trans('crud.destroy') }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
