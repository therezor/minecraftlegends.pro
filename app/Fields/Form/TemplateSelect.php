<?php

namespace App\Fields\Form;

use Kris\LaravelFormBuilder\Fields\FormField;

class TemplateSelect extends FormField
{
    protected function getTemplate()
    {
        return 'fields.form.template-select';
    }

    public function getDefaults()
    {
        return [
            'choices' => array_keys(config('sites.templates')),
        ];
    }
}
