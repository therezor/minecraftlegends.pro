<?php

namespace App\Forms\Sites\Site;

use App\Forms\BaseForm;
use Illuminate\Validation\Rule;

class CreateForm extends BaseForm
{
    public function buildForm()
    {
        $this->add('name', 'text', [
            'label' => trans('sites.create.name'),
            'attr' => ['placeholder' => trans('sites.create.name')],
        ]);
        $this->add('sub_domain', 'text', [
            'label' => trans('sites.create.domain'),
            'attr' => ['placeholder' => trans('sites.create.domain')],
        ]);
        $this->add('template', 'template-select', [
            'label' => trans('sites.create.template'),
            'rules' => ['required', Rule::in(array_keys(config('sites.templates')))],
        ]);
    }
}
