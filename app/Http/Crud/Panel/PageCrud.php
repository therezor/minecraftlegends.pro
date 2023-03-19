<?php

namespace App\Http\Crud\Panel;

use App\Eloquent\Repositories\Criteria\BelongsToSiteCriteria;
use App\Eloquent\Repositories\Site\PageRepository;
use App\Enums\Crud\Method;
use App\Http\Crud\BaseCrud;
use App\Fields\{ActionName, Actions, Field};
use Illuminate\Database\Eloquent\Model;

class PageCrud extends BaseCrud
{
    public function __construct(PageRepository $repository)
    {
        $this->repository = $repository;
    }

    public function title(): string
    {
        return trans('panel.pages.title');
    }

    public function getRouteName(): string
    {
        return 'panel.pages';
    }

    public function layout(): string
    {
        return 'layouts.panel';
    }

    protected function getViewPrefix(): string
    {
        return 'panel.pages';
    }

    public function getDefaultCriteria(Method $method): array
    {
        return [
            new BelongsToSiteCriteria(request()->get('current_site')),
        ];
    }

    public function getListFields(): array
    {
        return [
            ActionName::make('name', $this->getRouteName())->sortable(),
            Field::make('posts_count')->meta('d-none d-md-table-cell', 'list.class'),
            Actions::make('id', $this->getRouteName()),
        ];
    }

    public function getShowFields(): array
    {
        return [
            Field::make('name'),
            Field::make('posts_count'),
            Field::make('created_at'),
            Field::make('updated_at'),
        ];
    }

    public function getCreateFormClass(): ?string
    {
        return null;
    }

    public function emptyEntity(): Model
    {
        $entity = parent::emptyEntity();
        $entity->site_id = request()->get('current_site')->id;

        return $entity;
    }
    public function beforeStore($entity, &$fieldValues)
    {
        $fieldValues['site_id'] = request()->get('current_site')->id;
    }
}
