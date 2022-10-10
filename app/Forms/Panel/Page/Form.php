<?php

namespace App\Forms\Panel\Page;

use App\Forms\BaseForm;

class Form extends BaseForm
{
    public function buildForm()
    {
        $this->add('title', 'text');
        $this->add('slug', 'text');
        $this->add('og_title', 'text');
        $this->add('og_description', 'text');
        $this->add('description', 'textarea', [
            'attr' => ['rows' => 3],
        ]);
        $this->add('content', 'textarea', [
            'attr' => ['class' => 'html-editor'],
        ]);
    }
}
