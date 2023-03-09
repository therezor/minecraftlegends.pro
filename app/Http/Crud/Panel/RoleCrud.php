<?php

namespace App\Http\Crud\Panel;

use App\Eloquent\Repositories\Criteria\WithCountCriteria;
use App\Eloquent\Repositories\RoleRepository;
use App\Enums\Role\Permission;
use App\Forms\Panel\Role\{Form, FilterForm};
use App\Http\Crud\Traits\RedirectToShow;
use App\Fields\{Actions, ArrayList, DateTime, Field};
use App\Http\Crud\BaseCrud;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class RoleCrud extends BaseCrud
{
    use RedirectToShow;

    public function __construct(RoleRepository $repository)
    {
        $this->repository = $repository->pushCriteria(new WithCountCriteria('users'));
    }

    public function title(): string
    {
        return __('Roles');
    }

    public function getRouteName(): string
    {
        return 'admin.roles';
    }

    public function layout(): string
    {
        return 'layouts.admin';
    }

    public function getListFields(): array
    {
        return [
            Field::make('name')->sortable(),
            DateTime::make('created_at')->sortable(),
            Field::make('users_count'),
            Actions::make('id', $this->getRouteName()),
        ];
    }

    public function getShowFields(): array
    {
        return [
            Field::make('id'),
            Field::make('name'),
            Field::make('email'),
            ArrayList::make('permissions')->valueCallback(fn ($val) => Arr::only(Permission::select(), $val)),
            Field::make('users_count'),
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
