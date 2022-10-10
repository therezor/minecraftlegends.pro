<?php

namespace App\Forms\Panel\Category;

use App\Forms\BaseForm;

class Form extends BaseForm
{
    public function buildForm()
    {
        $this->add('name', 'text');
        $this->add('icon', 'text');
    }
}
