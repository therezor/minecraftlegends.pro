<?php

namespace App\Http\Crud\Sites\Blog;

use App\Eloquent\Repositories\Criteria\WithCountCriteria;
use App\Eloquent\Repositories\Site\Blog\CategoryRepository;
use App\Eloquent\Repositories\Criteria\BelongsToSiteCriteria;
use App\Enums\Crud\Method;
use App\Http\Crud\BaseCrud;
use App\Forms\Sites\Blog\Category\{Form, FilterForm};
use App\Http\Crud\Traits\RedirectToShow;
use App\Fields\{ActionName, Actions, Field};
use Illuminate\Database\Eloquent\Model;

class CategoryCrud extends BaseCrud
{
    use RedirectToShow;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function title(): string
    {
        return trans('sites.blog.categories.title');
    }

    public function getRouteName(): string
    {
        return 'sites.blog-categories';
    }

    public function layout(): string
    {
        return 'layouts.sites';
    }

    public function getDefaultCriteria(Method $method): array
    {
        return [
            new WithCountCriteria('posts'),
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
        return Form::class;
    }

    public function getFilterFormClass(): ?string
    {
        return FilterForm::class;
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
