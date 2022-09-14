<x-form wire:submit.prevent="submit" class="container-fluid max-w-screen-md vstack gap-5">
    <div>
        <x-form-input name="name" label="{{ __('Name') }}" />
    </div>

    <div>
        <x-form-select name="type" label="{{ __('Type') }}" :options="\App\Enums\Roles\Type::select()" />
    </div>

    <div>
        <x-form-group name="permissions" label="{{ __('Permissions') }}">
            @foreach(\App\Enums\Roles\Permission::select() as $value => $name)
                <x-form-checkbox wire:model="permissions" wire:loading.attr="disabled" name="permissions[]" label="{{ $name }}" value="{{ $value }}" />
            @endforeach
        </x-form-group>

    </div>

    <div class="text-end">
        <a href="{{ route($routePrefix . '.index') }}" type="button" class="btn btn-sm btn-neutral me-2">{{ __('Cancel') }}</a>
        <x-form-submit />
    </div>
</x-form>
