<?php

namespace App\Forms\Panel\Page;

use App\Forms\BaseForm;

class Form extends BaseForm
{
    public function buildForm()
    {
        $this->add('title', 'text', [
            'attr' => [
                'data-slug-input' => "#slug",
            ],
        ]);
        $this->add('slug', 'text');
        $this->add('meta_title', 'text');
        $this->add('meta_description', 'text');
        $this->add('description', 'textarea', [
            'attr' => ['rows' => 3],
        ]);
        $this->add('content', 'content-editor');
    }
}
