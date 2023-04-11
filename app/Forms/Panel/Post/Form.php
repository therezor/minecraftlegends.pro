<?php

namespace App\Forms\Panel\Post;

use App\Eloquent\Repositories\CategoryRepository;
use App\Enums\Blog\Post\Featured;
use App\Enums\Blog\Post\Status;
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
        $this->add('title', 'text', [
            'attr' => [
                'data-slug-input' => "#slug",
            ],
        ]);
        $this->add('slug', 'text');
        $this->add('description', 'textarea', [
            'attr' => ['rows' => 3],
        ]);
        $this->add('image', 'image-upload', [
            'label' => false,
            'accept' => '*.jpg,*.jpeg,*.bmp,*.png',
            'help_block' => [
                'text' => 'Max:10Mb | jpg, jpeg, bmp, png',
                'tag' => 'small',
            ],
        ]);
        $this->add('category_id', 'choice', [
            'choices' => $this->categoryRepository->select(),
            'empty_value' => ' ',
        ]);
        $this->add('status', 'choice', [
            'choices' => Status::select(),
            'empty_value' => ' ',
            'selected' => $this->getModel()->status->value ?? null,
        ]);
        $this->add('featured', 'choice', [
            'choices' => Featured::select(),
            'empty_value' => ' ',
            'selected' => $this->getModel()->featured->value ?? null,
        ]);
        $this->add('content', 'content-editor');
    }
}
