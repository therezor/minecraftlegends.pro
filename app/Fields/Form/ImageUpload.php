<?php

namespace App\Fields\Form;

use Kris\LaravelFormBuilder\Fields\FormField;

class ImageUpload extends FormField
{
    protected function getTemplate()
    {
        return 'fields.form.image-upload';
    }

    public function prepareOptions(array $options = [])
    {
        $this->setOption($this->valueProperty, $this->getValue()->url ?? asset('img/image-default.png'));

        return parent::prepareOptions($options);
    }

    public function getDefaults()
    {
        return [
            'accept'   => '*.jpg,*.jpeg,*.bmp,*.png',
        ];
    }
}
