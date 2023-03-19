<?php

namespace App\Forms\Panel\Page;

use App\Eloquent\Models\Site\Page;
use App\Forms\BaseForm;

class SettingsForm extends BaseForm
{
    public function buildForm()
    {
        /** @var Page $page */
        $page = $this->getModel();

        $this->add('name', 'text');
        if (!$page->is_main) {
            $this->add('slug', 'text', [
                'attr' => [
                    'data-slug-input' => "#slug",
                ],
            ]);
        }

        $this->add('meta_image_id', 'image-upload', [
            'accept' => '*.jpg,*.jpeg,*.bmp,*.png',
            'help_block' => [
                'text' => 'Max:10Mb | jpg, jpeg, bmp, png',
                'tag' => 'small',
            ],
        ]);
        $this->add('meta_title', 'text');
        $this->add('meta_description', 'text');
        $this->add('custom_js', 'textarea');
        $this->add('custom_css', 'textarea');
    }
}
