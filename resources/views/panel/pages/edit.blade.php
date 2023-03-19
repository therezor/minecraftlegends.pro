@extends('layouts.panel')

@section('header', $title)

@section('content')
    <div class="row">
        <div class="col-12 col-lg-7">
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
                    <div class="block block-rounded">
                        <div class="block-content p-2">
                            <div class="d-flex align-items-center">
                                <div class="drag me-2">
                                    <i class="fa fa-fw fa-grip-vertical"></i>
                                </div>

                                <div class="col d-flex flex-row align-items-center">
                                    <div class="me-2">
                                        <i class="fa fa-header h1 d-block my-auto" style="color: #494949"></i>
                                    </div>

                                    <div class="d-flex flex-column">
                                        <a href="#page-block-1" data-bs-toggle="collapse" aria-expanded="false" aria-controls="page-block-1" draggable="false" class="collapsed">
                                            <strong>Paragraph</strong>
                                        </a>

                                        <span class="d-flex align-items-center">Text</span>
                                    </div>
                                </div>

                                <div class="ms-2 d-flex justify-content-end">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" value="" checked="">
                                    </div>
                                </div>
                            </div>
                            <div class="p-2 collapse" id="page-block-1" data-bs-parent="#page-blocks">
                                <form name="update_biolink_" method="post" role="form">
                                    <div class="form-group">
                                        <label for="link_location_url_4"><svg class="svg-inline--fa fa-link fa-w-16 fa-fw fa-sm text-muted mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg><!-- <i class="fa fa-fw fa-link fa-sm text-muted mr-1"></i> Font Awesome fontawesome.com --> Destination URL</label>
                                        <input id="link_location_url_4" type="text" class="form-control" name="location_url" value="https://altumcode.com" maxlength="2048" placeholder="https://example.com/long-url-example" required="required">
                                    </div>

                                    <div class="form-group">
                                        <label for="link_name_4"><svg class="svg-inline--fa fa-signature fa-w-20 fa-fw fa-sm text-muted mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="signature" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M623.2 192c-51.8 3.5-125.7 54.7-163.1 71.5-29.1 13.1-54.2 24.4-76.1 24.4-22.6 0-26-16.2-21.3-51.9 1.1-8 11.7-79.2-42.7-76.1-25.1 1.5-64.3 24.8-169.5 126L192 182.2c30.4-75.9-53.2-151.5-129.7-102.8L7.4 116.3C0 121-2.2 130.9 2.5 138.4l17.2 27c4.7 7.5 14.6 9.7 22.1 4.9l58-38.9c18.4-11.7 40.7 7.2 32.7 27.1L34.3 404.1C27.5 421 37 448 64 448c8.3 0 16.5-3.2 22.6-9.4 42.2-42.2 154.7-150.7 211.2-195.8-2.2 28.5-2.1 58.9 20.6 83.8 15.3 16.8 37.3 25.3 65.5 25.3 35.6 0 68-14.6 102.3-30 33-14.8 99-62.6 138.4-65.8 8.5-.7 15.2-7.3 15.2-15.8v-32.1c.2-9.1-7.5-16.8-16.6-16.2z"></path></svg><!-- <i class="fa fa-fw fa-signature fa-sm text-muted mr-1"></i> Font Awesome fontawesome.com --> Name</label>
                                        <input id="link_name_4" type="text" name="name" class="form-control" value="View my portfolio" maxlength="128" required="required">
                                    </div>

                                    <div class="form-group custom-control custom-switch">
                                        <input id="link_open_in_new_tab_4" name="open_in_new_tab" type="checkbox" class="custom-control-input">
                                        <label class="custom-control-label" for="link_open_in_new_tab_4">Open in new tab</label>
                                    </div>

                                    <div class="form-group">
                                        <label for="link_image_4"><svg class="svg-inline--fa fa-image fa-w-16 fa-fw fa-sm text-muted mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg><!-- <i class="fa fa-fw fa-image fa-sm text-muted mr-1"></i> Font Awesome fontawesome.com --> Image thumbnail</label>
                                        <div data-image-container="image" class="d-none">
                                            <div class="row">
                                                <div class="m-1 col-6 col-xl-3">
                                                    <img src="" class="img-fluid rounded d-none" loading="lazy">
                                                </div>
                                            </div>
                                            <div class="custom-control custom-checkbox my-2">
                                                <input id="4_image_remove" name="image_remove" type="checkbox" class="custom-control-input" onchange="this.checked ? document.querySelector('#link_image_4').classList.add('d-none') : document.querySelector('#link_image_4').classList.remove('d-none')">
                                                <label class="custom-control-label" for="4_image_remove">
                                                    <span class="text-muted">Delete uploaded file</span>
                                                </label>
                                            </div>
                                        </div>
                                        <input id="link_image_4" type="file" name="image" accept=".jpg, .jpeg, .png, .svg, .gif, .webp" class="form-control-file altum-file-input">
                                        <small class="form-text text-muted">.jpg, .jpeg, .png, .svg, .gif, .webp allowed. 2 MB maximum.</small>
                                    </div>
                                    <div class="mt-4">
                                        <button type="submit" name="submit" class="btn btn-primary w-100" data-is-ajax="" data-inner-text="Update">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="block block-rounded">
                        <div class="block-content p-2">
                            <div class="d-flex align-items-center">
                                <div class="drag me-2">
                                    <i class="fa fa-fw fa-grip-vertical"></i>
                                </div>

                                <div class="col d-flex flex-row align-items-center">
                                    <div class="me-2">
                                        <i class="fa fa-header h1 d-block my-auto" style="color: #494949"></i>
                                    </div>

                                    <div class="d-flex flex-column">
                                        <a href="#page-block-2" data-bs-toggle="collapse" aria-expanded="false" aria-controls="page-block-2" draggable="false" class="collapsed">
                                            <strong>Paragraph</strong>
                                        </a>

                                        <span class="d-flex align-items-center">Text</span>
                                    </div>
                                </div>

                                <div class="ms-2 d-flex justify-content-end">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" value="" checked="">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 collapse" id="page-block-2" data-bs-parent="#page-blocks">
                                <form name="update_biolink_" method="post" role="form">
                                    <div class="form-group">
                                        <label for="link_location_url_4"><svg class="svg-inline--fa fa-link fa-w-16 fa-fw fa-sm text-muted mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg><!-- <i class="fa fa-fw fa-link fa-sm text-muted mr-1"></i> Font Awesome fontawesome.com --> Destination URL</label>
                                        <input id="link_location_url_4" type="text" class="form-control" name="location_url" value="https://altumcode.com" maxlength="2048" placeholder="https://example.com/long-url-example" required="required">
                                    </div>

                                    <div class="form-group">
                                        <label for="link_name_4"><svg class="svg-inline--fa fa-signature fa-w-20 fa-fw fa-sm text-muted mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="signature" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M623.2 192c-51.8 3.5-125.7 54.7-163.1 71.5-29.1 13.1-54.2 24.4-76.1 24.4-22.6 0-26-16.2-21.3-51.9 1.1-8 11.7-79.2-42.7-76.1-25.1 1.5-64.3 24.8-169.5 126L192 182.2c30.4-75.9-53.2-151.5-129.7-102.8L7.4 116.3C0 121-2.2 130.9 2.5 138.4l17.2 27c4.7 7.5 14.6 9.7 22.1 4.9l58-38.9c18.4-11.7 40.7 7.2 32.7 27.1L34.3 404.1C27.5 421 37 448 64 448c8.3 0 16.5-3.2 22.6-9.4 42.2-42.2 154.7-150.7 211.2-195.8-2.2 28.5-2.1 58.9 20.6 83.8 15.3 16.8 37.3 25.3 65.5 25.3 35.6 0 68-14.6 102.3-30 33-14.8 99-62.6 138.4-65.8 8.5-.7 15.2-7.3 15.2-15.8v-32.1c.2-9.1-7.5-16.8-16.6-16.2z"></path></svg><!-- <i class="fa fa-fw fa-signature fa-sm text-muted mr-1"></i> Font Awesome fontawesome.com --> Name</label>
                                        <input id="link_name_4" type="text" name="name" class="form-control" value="View my portfolio" maxlength="128" required="required">
                                    </div>

                                    <div class="form-group custom-control custom-switch">
                                        <input id="link_open_in_new_tab_4" name="open_in_new_tab" type="checkbox" class="custom-control-input">
                                        <label class="custom-control-label" for="link_open_in_new_tab_4">Open in new tab</label>
                                    </div>

                                    <div class="form-group">
                                        <label for="link_image_4"><svg class="svg-inline--fa fa-image fa-w-16 fa-fw fa-sm text-muted mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg><!-- <i class="fa fa-fw fa-image fa-sm text-muted mr-1"></i> Font Awesome fontawesome.com --> Image thumbnail</label>
                                        <div data-image-container="image" class="d-none">
                                            <div class="row">
                                                <div class="m-1 col-6 col-xl-3">
                                                    <img src="" class="img-fluid rounded d-none" loading="lazy">
                                                </div>
                                            </div>
                                            <div class="custom-control custom-checkbox my-2">
                                                <input id="4_image_remove" name="image_remove" type="checkbox" class="custom-control-input" onchange="this.checked ? document.querySelector('#link_image_4').classList.add('d-none') : document.querySelector('#link_image_4').classList.remove('d-none')">
                                                <label class="custom-control-label" for="4_image_remove">
                                                    <span class="text-muted">Delete uploaded file</span>
                                                </label>
                                            </div>
                                        </div>
                                        <input id="link_image_4" type="file" name="image" accept=".jpg, .jpeg, .png, .svg, .gif, .webp" class="form-control-file altum-file-input">
                                        <small class="form-text text-muted">.jpg, .jpeg, .png, .svg, .gif, .webp allowed. 2 MB maximum.</small>
                                    </div>
                                    <div class="mt-4">
                                        <button type="submit" name="submit" class="btn btn-primary w-100" data-is-ajax="" data-inner-text="Update">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
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
        <div class="col-12 col-lg-5">
            <div class="card border-2">
                <iframe class="w-100 min-vh-100" src="//site.litex.test" frameborder="0"></iframe>
            </div>
        </div>
    </div>

@endsection

@push('scripts')
    <script defer src="{{ mix('js/page.js') }}"></script>
@endpush
