<div>
    @include('components.messages')

    @if($selectedKey !== null)
        <div class="animated slideInLeft">
            <div class="block block-rounded">
                <div class="block-header">
                    <a href="#" wire:click.prevent="selectBlock()" wire:loading.attr="disabled" class="btn btn-secondary">
                        <i class="fa fa-fw fa-arrow-left me-1"></i> {{ trans('crud.back') }}
                    </a>
                    <h3 class="block-title">{{ $blocks[$selectedKey]['name'] }}</h3>
                </div>
                <div class="block-content p-2">
                    <div>Form goes here...</div>
                    <button type="submit" class="w-100 btn btn-primary">{{ trans('crud.save') }}</button>
                </div>
            </div>
        </div>
    @else
        <a href="#modal-add-block" data-bs-toggle="modal" data-bs-target="#modal-add-block" class="btn btn-secondary w-100 mb-2">
            <i class="fa fa-fw fa-plus"></i> Add block
        </a>

        <div wire:sortable="updateBlockOrder">
            <div class="block block-rounded mb-2">
                <div class="block-content p-2">
                    <div class="d-flex align-items-center">
                        <div wire:sortable.handle class="text-secondary me-2">
                            <i class="fa fa-fw fa-lock"></i>
                        </div>

                        <div class="col align-items-center text-truncate">
                            <a href="#page-block-footer" data-bs-toggle="collapse" aria-expanded="false" aria-controls="page-block-footer" class="collapsed fw-semibold">
                                Header
                            </a>
                        </div>

                        <div>
                            <small class="form-check form-switch mb-0">
                                <input class="form-check-input" type="checkbox" value="" checked="">
                            </small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-link text-secondary fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-fw fa-ellipsis"></i>
                            </button>
                            <div class="dropdown-menu fs-sm">
                                <a href="#page-block-footer" data-bs-toggle="collapse" aria-expanded="false" aria-controls="page-block-footer" title="{{ trans('crud.edit') }}" class="dropdown-item fs-sm fw-medium">
                                    <i class="fa fa-fw fa-pencil-alt"></i> {{ trans('crud.edit') }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 collapse" id="page-block-footer" data-bs-parent="#page-blocks">
                    </div>
                </div>
            </div>

            @foreach($blocks as $key => $block)
                @include('panel.pages.blocks.header')
            @endforeach
            <div class="block block-rounded mb-2">
                <div class="block-content p-2">
                    <div class="d-flex align-items-center">
                        <div wire:sortable.handle class="text-secondary me-2">
                            <i class="fa fa-fw fa-lock"></i>
                        </div>

                        <div class="col align-items-center text-truncate">
                            <a href="#page-block-footer" data-bs-toggle="collapse" aria-expanded="false" aria-controls="page-block-footer" class="collapsed fw-semibold">
                                Footer
                            </a>
                        </div>

                        <div>
                            <small class="form-check form-switch mb-0">
                                <input class="form-check-input" type="checkbox" value="" checked="">
                            </small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-link text-secondary fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-fw fa-ellipsis"></i>
                            </button>
                            <div class="dropdown-menu fs-sm">
                                <a href="#page-block-footer" data-bs-toggle="collapse" aria-expanded="false" aria-controls="page-block-footer" title="{{ trans('crud.edit') }}" class="dropdown-item fs-sm fw-medium">
                                    <i class="fa fa-fw fa-pencil-alt"></i> {{ trans('crud.edit') }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 collapse" id="page-block-footer" data-bs-parent="#page-blocks">
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="modal-add-block" tabindex="-1" aria-labelledby="modal-add-block" aria-hidden="true" style="display: none;">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="block block-rounded block-transparent mb-0">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Add block</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close">
                                    <i class="fa fa-fw fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="block-content">
                            <button data-bs-toggle="modal" wire:click.prevent="addBlock('Header')" wire:loading.attr="disabled" class="btn btn-primary w-100 mb-2">
                                <i class="fa fa-fw fa-header"></i> Header
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif
</div>

