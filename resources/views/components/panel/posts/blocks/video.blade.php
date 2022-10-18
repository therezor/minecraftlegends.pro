@if(isset($block['data']['embed_code']))
    <div class="mb-4">
        <x-form-input :name="'post.blocks.' . $key . '.title'" placeholder="{{ trans('attributes.title') }}"/>
    </div>

    <div class="ratio ratio-16x9 position-relative">
        {!! $block['data']['embed_code'] !!}
        <div>
            <button class="btn btn-danger btn-sm btn-square position-absolute top-1 end-1" wire:click.prevent="removeVideo('{{ $key }}')" wire:loading.attr="disabled">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    </div>

    <div class="text-center my-2">
        <a class="text-muted" data-bs-toggle="collapse" href="#collapse-description-{{ $key }}" role="button" aria-expanded="false">
            {{ trans('crud.more') }}
        </a>
    </div>

    <div id="collapse-description-{{ $key }}" class="collapse">
        <x-form-textarea class="text-editor" :name="'post.blocks.' . $key . '.description'" rows="3" placeholder="{{ trans('attributes.description') }}"/>
    </div>
@else
    <div class="rounded bg-secondary bg-opacity-10 border-2 border-secondary">
        <div class="px-5 py-20">
            <div class="input-group">
                <x-form-input required type="url" :name="'post.blocks.' . $key . '.data.video_url'" placeholder="https://www.youtube.com/watch?v=xxxxxxxxxxx"/>
                <button class="btn btn-secondary" type="button" wire:click.prevent="uploadVideo({{ $key }})" wire:loading.attr="disabled" >
                    {{ __('Get') }}
                    <i class="bi bi-cloud-arrow-down"></i>
                </button>
            </div>
        </div>
    </div>
@endif

