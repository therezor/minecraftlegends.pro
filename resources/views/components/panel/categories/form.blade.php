<x-form wire:submit.prevent="submit" class="container-fluid max-w-screen-md vstack gap-5">
    <div>
        <x-form-input required name="name" label="{{ __('Name') }}" />
    </div>

    <div class="text-end">
        <a href="{{ route($routePrefix . '.index') }}" type="button" class="btn btn-sm btn-neutral me-2">{{ __('Cancel') }}</a>
        <x-form-submit />
    </div>
</x-form>
