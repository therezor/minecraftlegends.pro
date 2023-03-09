<?php

namespace App\Http\Crud\Admin;

use App\Eloquent\Repositories\PageRepository;
use App\Forms\Admin\Page\{Form, FilterForm};
use App\Fields\{Actions, Field};
use App\Http\Crud\BaseCrud;

class SiteCrud extends BaseCrud
{
    public function __construct(PageRepository $repository)
    {
        $this->repository = $repository;
    }

    public function title(): string
    {
        return __('Sites');
    }

    public function getRouteName(): string
    {
        return 'admin.sites';
    }

    public function layout(): string
    {
        return 'layouts.admin';
    }

    public function getListFields(): array
    {
        return [
            Field::make('title')->sortable()->limit(45),
            Field::make('author.name'),
            Actions::make('id', $this->getRouteName()),
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

    public function beforeStore($entity, &$fieldValues)
    {
        $fieldValues['user_id'] = auth()->id();
    }
}
