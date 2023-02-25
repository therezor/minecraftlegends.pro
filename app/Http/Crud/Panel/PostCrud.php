<?php

namespace App\Http\Crud\Panel;

use App\Eloquent\Repositories\ImageRepository;
use App\Eloquent\Repositories\PostRepository;
use App\Enums\Crud\Method;
use App\Forms\Panel\Post\{Form, FilterForm};
use App\Http\Crud\Traits\RedirectToShow;
use App\Fields\{Actions, DateTime, Enum, Field};
use App\Http\Crud\BaseCrud;

class PostCrud extends BaseCrud
{
    use RedirectToShow;

    protected ImageRepository $imageRepository;

    public function __construct(PostRepository $repository, ImageRepository $imageRepository)
    {
        $this->repository = $repository;
        $this->imageRepository = $imageRepository;
    }

    public function title(): string
    {
        return __('Posts');
    }

    public function getRouteName(): string
    {
        return 'panel.posts';
    }

    public function layout(): string
    {
        return 'layouts.panel';
    }

    public function getListFields(): array
    {
        return [
            Field::make('title')->sortable()->limit(45),
            Enum::make('status')->sortable(),
            Enum::make('featured')->sortable(),
            DateTime::make('created_at'),
            Field::make('author.name'),
            Actions::make('id', $this->getRouteName()),
        ];
    }

    public function getFilterFormClass(): ?string
    {
        return FilterForm::class;
    }

    public function getCreateFormClass(): ?string
    {
        return Form::class;
    }

    public function getViewByMethod(Method $method): string
    {
        if (Method::CREATE === $method) {
            return 'panel.posts.create';
        }

        if (Method::EDIT === $method) {
            return 'panel.posts.edit';
        }

        return parent::getViewByMethod($method);
    }

    public function beforeStore($entity, &$fieldValues)
    {
        $fieldValues['user_id'] = auth()->id();
        if (!empty($fieldValues['image'])) {
            $fieldValues['image_id'] = $this->imageRepository->upload($fieldValues['image'], auth()->user())->id;
        }
    }

    public function beforeUpdate($entity, &$fieldValues)
    {
        if (!empty($fieldValues['image'])) {
            $fieldValues['image_id'] = $this->imageRepository->upload($fieldValues['image'], auth()->user())->id;
        }
    }
}
