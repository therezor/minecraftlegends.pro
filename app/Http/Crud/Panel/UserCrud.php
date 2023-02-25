<?php

namespace App\Http\Crud\Panel;

use App\Eloquent\Repositories\UserRepository;
use App\Forms\Panel\User\FilterForm;
use App\Http\Crud\Traits\RedirectToShow;
use App\Forms\Panel\User\Form;
use App\Fields\{Actions, DateTime, Field};
use App\Http\Crud\BaseCrud;

class UserCrud extends BaseCrud
{
    use RedirectToShow;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function title(): string
    {
        return __('Users');
    }

    public function getRouteName(): string
    {
        return 'panel.users';
    }

    public function layout(): string
    {
        return 'layouts.panel';
    }

    public function getListFields(): array
    {
        return [
            Field::make('name')->sortable(),
            Field::make('email')->sortable(),
            DateTime::make('email_verified_at'),
            Field::make('role.name'),
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
