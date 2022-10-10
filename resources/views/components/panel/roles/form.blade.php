<x-form wire:submit.prevent="submit" class="container-fluid max-w-screen-md vstack gap-5">
    <div>
        <x-form-input name="name" required label="{{ __('Name') }}"/>
    </div>

    <div>
        <x-form-group name="permissions" label="{{ __('Permissions') }}">
            @foreach(\App\Enums\Role\Permission::select() as $value => $name)
                <x-form-checkbox wire:model.defer="permissions" name="permissions[]" label="{{ $name }}"
                                 value="{{ $value }}"/>
            @endforeach
        </x-form-group>

    </div>

    <div class="text-end">
        <a href="{{ route($routePrefix . '.index') }}" type="button"
           class="btn btn-sm btn-neutral me-2">{{ __('Cancel') }}</a>
        <x-form-submit/>
    </div>
</x-form>
