<div class="container-fluid">
    <div class="card mb-7">
        @include('components.panel.includes.search')
        <div class="table-responsive">
            <table class="table table-hover table-nowrap">
                <thead class="table-light">
                <tr>
                    <th scope="col">{{ __('ID') }}</th>
                    <th scope="col">{{ __('Name') }}</th>
                    <th scope="col">{{ __('Posts') }}</th>
                    <th scope="col">{{ __('Created at') }}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @forelse($items as $item)
                    <tr>
                        <td>
                            {{ $item->id }}
                        </td>
                        <td>
                            <i class="bi bi-{{ $item->icon }}"></i> {{ $item->name }}
                        </td>
                        <td>
                            {{ $item->posts_count }}
                        </td>
                        <td>
                            {{ $item->created_at->toDateTimestring() }}
                        </td>
                        <td class="text-end text-nowrap">
                            <a href="{{ route('panel.categories.edit', $item->id) }}" class="btn btn-sm btn-square btn-warning me-1">
                                <i class="bi bi-pencil"></i>
                            </a>
                            <button wire:click="delete({{ $item->id }})" wire:loading.attr="disabled" type="button" class="btn btn-sm btn-square btn-danger">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td class="text-center text-muted" colspan="5">
                            <i>{{ __('Nothing') }}</i>
                        </td>
                    </tr>
                @endforelse
                </tbody>
            </table>
        </div>
        @include('components.panel.includes.pagination')
    </div>
</div>
