<?php

namespace App\Forms\Panel\Page;

use App\Forms\BaseForm;

class CreateForm extends BaseForm
{
    public function buildForm()
    {
        $this->add('name', 'text');
        $this->add('slug', 'text', [
            'attr' => [
                'data-slug-input' => "#slug",
            ],
        ]);
    }
}
