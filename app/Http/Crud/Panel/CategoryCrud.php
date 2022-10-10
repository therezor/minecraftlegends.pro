<?php

namespace App\Http\Crud\Panel;

use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\Criteria\WithCountCriteria;
use App\Forms\Panel\Category\{Form, FilterForm};
use App\Http\Crud\Traits\RedirectToShow;
use App\Fields\{Actions, DateTime, Field, Icon};
use App\Http\Crud\BaseCrud;

class CategoryCrud extends BaseCrud
{
    use RedirectToShow;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository->pushCriteria(new WithCountCriteria('posts'));
    }

    public function title(): string
    {
        return __('Categories');
    }

    public function getRouteName(): string
    {
        return 'panel.categories';
    }

    public function getListFields(): array
    {
        return [
            Field::make('id')->sortable(),
            Field::make('name')->sortable(),
            Icon::make('icon'),
            Field::make('posts_count'),
            Actions::make('id', $this->getRouteName()),
        ];
    }

    public function getShowFields(): array
    {
        return [
            Field::make('id'),
            Field::make('name'),
            Field::make('posts_count'),
            Icon::make('icon'),
            Field::make('created_at'),
            Field::make('updated_at'),
        ];
    }

    public function getCreateFormClass(): ?string
    {
        return Form::class;
    }

    public function getFilterFormClass(): ?string
    {
        return FilterForm::class;
    }
}
