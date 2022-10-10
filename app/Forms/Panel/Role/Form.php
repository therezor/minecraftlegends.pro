<?php

namespace App\Forms\Panel\Role;

use App\Enums\Role\Permission;
use App\Forms\BaseForm;

class Form extends BaseForm
{
    public function buildForm()
    {
        $this->add('name', 'text');
        $this->add('permissions', 'choice', [
            'expanded'    => true,
            'multiple'    => true,
            'choices'     => Permission::select(),
            'empty_value' => ' ',
            'choice_options' => [
                'wrapper' => ['class' => 'form-check'],
            ],
        ]);
    }
}
