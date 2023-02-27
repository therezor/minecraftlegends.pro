<?php

namespace App\Forms\Sites\Blog\Category;

use App\Forms\BaseForm;

class Form extends BaseForm
{
    public function buildForm()
    {
        $this->add('name', 'text', [
            'attr' => [
                'data-slug-input' => "#slug",
            ],
        ]);
    }
}
