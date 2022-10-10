<div class="container-fluid">
    <div class="card mb-7">
        @include('components.panel.includes.search')
        <div class="table-responsive">
            <table class="table table-hover table-nowrap">
                <thead class="table-light">
                <tr>
                    <th scope="col">{{ __('ID') }}</th>
                    <th scope="col">{{ __('Title') }}</th>
                    <th scope="col">{{ __('Status') }}</th>
                    <th scope="col">{{ __('User') }}</th>
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
                            {{ \Illuminate\Support\Str::limit($item->title, 40) }}
                        </td>
                        <td>
                            <span class="badge badge-lg badge-dot">
                                @switch($item->status)
                                    @case(\App\Enums\Post\Status::PUBLISHED)
                                        <i class="bg-success"></i>
                                        @break
                                    @case(\App\Enums\Post\Status::ARCHIVE)
                                        <i class="bg-danger"></i>
                                        @break
                                    @default
                                        <i class="bg-warning"></i>
                                @endswitch
                                {{ \App\Enums\Post\Status::select()[$item->status->value] }}
                            </span>
                        </td>
                        <td>
                            {{ $item->user->name }}
                        </td>
                        <td>
                            {{ $item->created_at->toDateTimestring() }}
                        </td>
                        <td class="text-end text-nowrap">
                            <a href="{{ route('panel.posts.edit', $item->id) }}"
                               class="btn btn-sm btn-square btn-warning me-1">
                                <i class="bi bi-pencil"></i>
                            </a>
                            <button wire:click="delete({{ $item->id }})" wire:loading.attr="disabled" type="button"
                                    class="btn btn-sm btn-square btn-danger">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td class="text-center text-muted" colspan="6">
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
