<?php

namespace App\Forms\Panel\Site;

use App\Forms\BaseForm;
use Illuminate\Validation\Rule;

class CreateForm extends BaseForm
{
    public function buildForm()
    {
        $this->add('name', 'text', [
            'label' => trans('panel.create.name'),
            'attr' => ['placeholder' => trans('panel.create.name')],
        ]);
        $this->add('sub_domain', 'text', [
            'label' => trans('panel.create.domain'),
            'attr' => ['placeholder' => trans('panel.create.domain')],
        ]);
        $this->add('template', 'template-select', [
            'label' => trans('panel.create.template'),
            'rules' => ['required', Rule::in(array_keys(config('sites.templates')))],
        ]);
    }
}
