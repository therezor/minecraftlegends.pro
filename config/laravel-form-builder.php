<?php

return [
    'defaults' => [
        'wrapper_class' => 'mb-4',
        'wrapper_error_class' => 'has-error',
        'label_class' => 'form-label',
        'field_class' => 'form-control',
        'field_error_class' => 'is-invalid',
        'help_block_class' => 'form-text',
        'error_class' => 'invalid-feedback',
        'required_class' => 'required',

        'help_block_tag' => 'p',

        'checkbox' => [
            'wrapper_class' => 'form-check',
            'label_class' => 'form-check-label',
            'field_class' => 'form-check-input',
        ],

        // Override a class from a field.
        //'text'                => [
        //    'wrapper_class'   => 'form-field-text',
        //    'label_class'     => 'form-field-text-label',
        //    'field_class'     => 'form-field-text-field',
        //]

    ],
    // Templates
    'form' => 'laravel-form-builder::form',
    'text' => 'laravel-form-builder::text',
    'textarea' => 'laravel-form-builder::textarea',
    'button' => 'laravel-form-builder::button',
    'buttongroup' => 'laravel-form-builder::buttongroup',
    'radio' => 'laravel-form-builder::radio',
    'checkbox' => 'laravel-form-builder::checkbox',
    'select' => 'laravel-form-builder::select',
    'choice' => 'laravel-form-builder::choice',
    'repeated' => 'laravel-form-builder::repeated',
    'child_form' => 'laravel-form-builder::child_form',
    'collection' => 'laravel-form-builder::collection',
    'static' => 'laravel-form-builder::static',

    // Remove the laravel-form-builder:: prefix above when using template_prefix
    'template_prefix' => '',

    'default_namespace' => '',

    'custom_fields' => [
        'image-upload' => \App\Fields\Form\ImageUpload::class,
        'content-editor' => \App\Fields\Form\ContentEditor::class,
    ],

    'plain_form_class' => \Kris\LaravelFormBuilder\Form::class,
    'form_builder_class' => \Kris\LaravelFormBuilder\FormBuilder::class,
    'form_helper_class' => \Kris\LaravelFormBuilder\FormHelper::class,
];
