@extends('layouts.app')

@section('header', $title)

@section('body')
    <div id="page-container" class="page-header-dark">
        <header id="page-header">
            <div class="content-header">
                <div class="d-flex align-items-center">
                    <a class="btn btn-secondary" href="{{ route('panel.pages.index', $hostname) }}">
                        <i class="fa fa-fw fa-arrow-left me-1"></i> {{ trans('crud.back_to_list') }}
                    </a>
                </div>

                <div class="align-items-center d-none d-lg-flex">
                    <div id="device-selector" class="btn-group" role="group" aria-label="Device">
                        <button type="button" data-device="desktop" class="btn btn-secondary active">
                            <i class="fa fa-fw fa-desktop"></i>
                        </button>
                        <button type="button" data-device="tablet" class="btn btn-secondary">
                            <i class="fa fa-fw fa-tablet-screen-button"></i>
                        </button>
                        <button type="button" data-device="mobile" class="btn btn-secondary">
                            <i class="fa fa-fw fa-mobile-screen-button"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <main id="main-container">
            <div class="content p-4">
                <div class="row">
                    <div class="col-lg-4">
                        <ul class="nav nav-pills push">
                            <li class="nav-item me-1">
                                <a class="nav-link active" href="#page-blocks" data-bs-toggle="pill" aria-expanded="true">
                                    <i class="fa fa-fw fa-table-cells-large me-1"></i> {{ trans('panel.pages.blocks') }}
                                </a>
                            </li>
                            <li class="nav-item me-1">
                                <a class="nav-link" href="#page-settings" data-bs-toggle="pill" aria-expanded="false">
                                    <i class="fa fa-wrench me-1"></i> {{ trans('panel.pages.settings') }}
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="page-blocks" role="tabpanel">
                                @livewire('page-editor', ['blocks' => []])
                            </div>
                            <div class="tab-pane fade" id="page-settings" role="tabpanel">
                                {!! form_start($form) !!}

                                <div class="block block-rounded">
                                    <div class="block-header block-header-default">
                                        <h3 class="block-title">Name</h3>
                                        <div class="block-options">
                                            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i class="si si-arrow-up"></i></button>
                                        </div>
                                    </div>
                                    <div class="block-content block-content-full">
                                        {!! form_rows($form, ['name', 'slug']) !!}
                                        <button type="submit" class="w-100 btn btn-primary">{{ trans('crud.update') }}</button>
                                    </div>
                                </div>

                                <div class="block block-rounded block-mode-hidden">
                                    <div class="block-header block-header-default">
                                        <h3 class="block-title">SEO</h3>
                                        <div class="block-options">
                                            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i class="si si-arrow-up"></i></button>
                                        </div>
                                    </div>
                                    <div class="block-content block-content-full">
                                        {!! form_rows($form, ['meta_image_id', 'meta_title', 'meta_description']) !!}
                                        <button type="submit" class="w-100 btn btn-primary">{{ trans('crud.update') }}</button>
                                    </div>
                                </div>
                                <div class="block block-rounded block-mode-hidden">
                                    <div class="block-header block-header-default">
                                        <h3 class="block-title">Advanced</h3>
                                        <div class="block-options">
                                            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i class="si si-arrow-up"></i></button>
                                        </div>
                                    </div>
                                    <div class="block-content block-content-full">
                                        {!! form_rows($form, ['custom_js', 'custom_css']) !!}
                                        <button type="submit" class="w-100 btn btn-primary">{{ trans('crud.update') }}</button>
                                    </div>
                                </div>

                                {!! form_end($form) !!}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div id="page-preview" class="border border-3 border-dark rounded m-auto overflow-hidden" style="width: 100%">
                            <iframe src="//site.litex.test"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
@endsection

@push('styles')
    @livewireStyles
@endpush

@push('scripts')
    @livewireScripts
    <script defer src="{{ mix('js/page.js') }}"></script>
@endpush
