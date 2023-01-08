<?php

namespace App\Forms\Panel\Category;

use App\Eloquent\Repositories\CategoryRepository;
use App\Forms\BaseForm;

class Form extends BaseForm
{
    protected CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function buildForm()
    {
        $this->add('name', 'text', [
            'attr' => [
                'data-slug-input' => "#slug",
            ],
        ]);
        $this->add('slug', 'text');
        $this->add('display_order', 'number', [
            'default_value' => $this->categoryRepository->count(),
        ]);
    }
}
