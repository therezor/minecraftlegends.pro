<x-form wire:submit.prevent="submit" class="container-fluid max-w-screen-md vstack gap-5">
    <div>
        <x-form-input required name="title" label="{{ __('Title') }}" />
    </div>

    <div>
        <x-form-input required name="slug" label="{{ __('Slug') }}" />
    </div>

    <div>
        <x-form-select required name="categoryId" :options="['' => ''] + $categoriesSelect" label="{{ __('Category') }}" />
    </div>

    <div>
        <x-form-select required name="status" :options="['' => ''] + \App\Enums\Posts\Status::select()" label="{{ __('Status') }}" />
    </div>

    <div>
        <x-form-textarea name="intro" rows="6" label="{{ __('intro') }}" />
    </div>


    <div class="text-end">
        <a href="{{ route($routePrefix . '.index') }}" type="button" class="btn btn-sm btn-neutral me-2">{{ __('Cancel') }}</a>
        <x-form-submit />
    </div>
</x-form>
