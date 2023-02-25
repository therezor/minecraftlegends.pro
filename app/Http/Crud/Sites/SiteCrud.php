<?php

namespace App\Http\Crud\Sites;

use App\Eloquent\Repositories\Contracts\Repository;
use App\Eloquent\Repositories\Criteria\OwnedByUserCriteria;
use App\Eloquent\Repositories\Site\SiteRepository;
use App\Enums\Crud\Method;
use App\Forms\Sites\Site\CreateForm;
use App\Http\Crud\BaseCrud;

class SiteCrud extends BaseCrud
{
    public function __construct(SiteRepository $repository)
    {
        $this->repository = $repository;
    }

    public function title(): string
    {
        return trans('sites.title');
    }

    public function getRouteName(): string
    {
        return 'sites';
    }

    public function layout(): string
    {
        return 'layouts.sites';
    }

    public function getListFields(): array
    {
        return [];
    }

    public function getCreateFormClass(): ?string
    {
        return CreateForm::class;
    }

    public function getViewByMethod(Method $method): string
    {
        if ($method === Method::INDEX) {
            return 'sites.index';
        }

        if ($method === Method::CREATE) {
            return 'sites.create';
        }

        return parent::getViewByMethod($method);
    }

    public function beforeStore($entity, &$fieldValues)
    {
        $fieldValues['user_id'] = auth()->id();
        $fieldValues['domain'] = $fieldValues['domain'] . '.' . config('sites.domains.0');
    }

    public function getRepository(): Repository
    {
        $this->repository->pushOnceCriteria(new OwnedByUserCriteria(auth()->user()));

        return parent::getRepository();
    }
}
