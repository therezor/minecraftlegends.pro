<aside id="side-overlay">
    <div class="content-header border-bottom">
        <div class="ms-2">
            <a class="text-dark fw-semibold fs-sm" href="#profile-url"><i class="fa fa-fw fa-user"></i> {{ auth()->user()->name }}</a>
        </div>

        <button class="ms-auto btn btn-sm btn-alt-danger" data-toggle="layout" data-action="side_overlay_close">
            <i class="fa fa-fw fa-times"></i>
        </button>
    </div>

    <div class="content-side p-0">
        <div class="block block-transparent">
            <div class="block-header block-header-default">
                <h3 class="block-title">{{ trans('panel.title') }}</h3>
                <div class="block-options">
                    <button type="button" class="btn-block-option" data-toggle="block-option" data-action="content_toggle"></button>
                </div>
            </div>
            <div class="block-content">
                <ul class="nav-items mb-0">
                    <li>
                        <a class="text-dark d-flex py-2" href="{{ route('panel.create') }}">
                            <div class="flex-shrink-0 me-3 ms-2">
                                <i class="fa fa-fw fa-plus text-success"></i>
                            </div>
                            <div class="flex-grow-1 fs-sm">
                                <div class="fw-semibold">{{ trans('panel.create.title') }}</div>
                            </div>
                        </a>
                    </li>
                    @foreach($sites as $entity)
                        <li>
                            <a class="text-dark d-flex py-2 @if($entity->id === $site->id) active @endif" href="{{ route('panel.show', $entity->hostname) }}">
                                <div class="flex-shrink-0 me-3 ms-2">
                                    <i class="fa fa-fw fa-globe text-info"></i>
                                </div>
                                <div class="flex-grow-1 fs-sm">
                                    <div class="fw-semibold">{{ $entity->name }}</div>
                                    <small class="text-muted">{{ $entity->hostname }}</small>
                                </div>
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</aside>
