<div class="p-4 border-bottom d-flex">
    <div class="input-group input-group-sm input-group-inline"><span class="input-group-text pe-2"><i class="bi bi-search"></i> </span>
        <input wire:model.debounce.500ms="search" type="search" class="form-control" placeholder="{{ __('Search') }}" aria-label="Search">
    </div>
</div>
