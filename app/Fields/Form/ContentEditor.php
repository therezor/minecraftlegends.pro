<?php

namespace App\Fields\Form;

use Kris\LaravelFormBuilder\Fields\FormField;

class ContentEditor extends FormField
{
    protected function getTemplate()
    {
        return 'fields.form.content-editor';
    }
}
