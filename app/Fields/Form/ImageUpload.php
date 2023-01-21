<?php

namespace App\Fields\Form;

use Kris\LaravelFormBuilder\Fields\FormField;

class ImageUpload extends FormField
{

    protected function getTemplate()
    {
        return 'fields.form.image-upload';
    }

    protected function setupValue()
    {
        parent::setupValue();

        $this->setValue($this->getValue()->url ?? asset('img/image-default.png'));
    }

    public function getDefaults()
    {
        return [
            'accept'   => '*.jpg,*.jpeg,*.bmp,*.png',
        ];
    }
}
