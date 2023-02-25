<?php

namespace App\Http\Crud\Panel;

use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\Criteria\WithCountCriteria;
use App\Forms\Panel\Category\{Form, FilterForm};
use App\Http\Crud\Traits\RedirectToShow;
use App\Fields\{Actions, Field};
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

    public function layout(): string
    {
        return 'layouts.panel';
    }

    public function getListFields(): array
    {
        return [
            Field::make('name')->sortable(),
            Field::make('posts_count'),
            Field::make('display_order')->sortable(),
            Actions::make('id', $this->getRouteName()),
        ];
    }

    public function getShowFields(): array
    {
        return [
            Field::make('id'),
            Field::make('name'),
            Field::make('posts_count'),
            Field::make('display_order'),
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
