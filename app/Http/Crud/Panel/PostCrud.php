<?php

namespace App\Http\Crud\Panel;

use App\Eloquent\Repositories\PostRepository;
use App\Forms\Panel\User\FilterForm;
use App\Http\Crud\Traits\RedirectToShow;
use App\Forms\Panel\User\Form;
use App\Fields\{Actions, DateTime, Field};
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
            Field::make('type'),
            Field::make('featured'),
            DateTime::make('created_at'),
            Field::make('user.name'),
            Actions::make('id', $this->getRouteName()),
        ];
    }

    public function getShowFields(): array
    {
        return [
            Field::make('id'),
            Field::make('name'),
            Field::make('email'),
            DateTime::make('email_verified_at'),
            Field::make('role.name'),
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
