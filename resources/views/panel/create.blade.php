@extends('layouts.simple')

@section('header', $title)

@section('container')

    {!! form_start($form) !!}
        <div class="row g-0 justify-content-center">

            <div class="col-lg-7">
                <div class="block block-rounded">
                    <div class="block-header">
                        <h3 class="block-title">
                            1. {{ trans('panel.create.step_1') }}
                        </h3>
                    </div>
                    <div class="block-content">
                            <div class="form-floating mb-4">
                                {!! form_widget($form->name) !!}
                                {!! form_label($form->name) !!}
                                {!! form_errors($form->name) !!}
                            </div>

                            <div class="form-floating mb-4">
                                <div class="input-group">
                                    <div class="form-floating">
                                        {!! form_widget($form->hostname) !!}
                                        {!! form_label($form->hostname) !!}
                                    </div>
                                    <span class="input-group-text">.{{ config('sites.domains.0') }}</span>
                                </div>
                                {!! form_errors($form->hostname, ['errors' => ['class' => 'invalid-feedback d-block']]) !!}
                                <p class="form-text">{{ trans('panel.create.domain_notice') }}</p>
                            </div>

                    </div>
                </div>

                <div class="block block-rounded">
                    <div class="block-header">
                        <h3 class="block-title">
                            2. {{ trans('panel.create.step_2') }}
                        </h3>
                    </div>

                    <div class="block-content block-content-full space-y-3">
                        {!! form_errors($form->template, ['errors' => ['class' => 'invalid-feedback d-block']]) !!}
                        {!! form_widget($form->template) !!}
                        <p class="form-text">{{ trans('panel.create.template_notice') }}</p>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary w-100 py-3 push">
                    {{ trans('panel.create.submit') }}
                </button>
            </div>
        </div>
    {!! form_end($form) !!}
@endsection
