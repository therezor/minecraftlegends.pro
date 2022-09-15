<x-form wire:submit.prevent="submit" class="container-fluid max-w-screen-md vstack gap-5">
    <div>
        <x-form-input name="name" label="{{ __('Name') }}" />
    </div>

    <div>
        <x-form-input type="email" name="email" label="{{ __('Email') }}" />
    </div>

    <div>
        <x-form-select name="roleId" :options="$rolesSelect" label="{{ __('Role') }}" />
    </div>

    <div>
        <x-form-input type="password" name="password" label="{{ __('Change password') }}" />
    </div>

    <div class="text-end">
        <a href="{{ route($routePrefix . '.index') }}" type="button" class="btn btn-sm btn-neutral me-2">{{ __('Cancel') }}</a>
        <x-form-submit />
    </div>
</x-form>
