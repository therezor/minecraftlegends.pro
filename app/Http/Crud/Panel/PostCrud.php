<?php

namespace App\Http\Crud\Panel;

use App\Eloquent\Repositories\PostRepository;
use App\Forms\Panel\User\FilterForm;
use App\Http\Crud\Traits\RedirectToShow;
use App\Fields\{Actions, DateTime, Enum, Field};
use App\Http\Crud\BaseCrud;

class PostCrud extends BaseCrud
{
    use RedirectToShow;

    public function __construct(PostRepository $repository)
    {
        $this->repository = $repository;
    }

    public function title(): string
    {
        return __('Posts');
    }

    public function getRouteName(): string
    {
        return 'panel.posts';
    }

    public function getListFields(): array
    {
        return [
            Field::make('id')->sortable(),
            Field::make('title')->sortable()->limit(45),
            Enum::make('status')->sortable(),
            Enum::make('featured')->sortable(),
            DateTime::make('created_at'),
            Field::make('user.name'),
            Actions::make('id', $this->getRouteName()),
        ];
    }

    public function getFilterFormClass(): ?string
    {
        return FilterForm::class;
    }
}
