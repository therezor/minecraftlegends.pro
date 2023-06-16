<?php

namespace App\Http\Crud;

use App\Eloquent\Repositories\Contracts\Repository;
use App\Enums\Crud\Method;
use App\Http\Crud\Traits\Hookable;
use App\Http\Crud\Traits\Sortable;
use Illuminate\Support\Str;

abstract class BaseCrud
{
    use Sortable;
    use Hookable;

    protected $repository;

    /**
     * Items per page on list view
     *
     * @var int
     */
    public $perPage = 20;

    /**
     * Available route methods
     *
     * @var array
     */
    public $methods = [
        Method::INDEX,
        Method::CREATE,
        Method::SHOW,
        Method::STORE,
        Method::EDIT,
        Method::UPDATE,
        Method::DESTROY,
    ];

    /**
     * Plural name for page title etc...
     *
     * @return string
     */
    abstract public function title(): string;

    /**
     * Crud route name prefix
     *
     * @return string
     */
    abstract public function getRouteName(): string;

    public function getRepository(): Repository
    {
        return $this->repository;
    }

    public function getListFields(): array
    {
        return [];
    }

    public function getShowFields(): array
    {
        return $this->getListFields();
    }

    public function getCreateFormClass(): ?string
    {
        return null;
    }

    public function getEditFormClass(): ?string
    {
        return $this->getCreateFormClass();
    }

    public function getFilterFormClass(): ?string
    {
        return null;
    }

    public function getViewByMethod(Method $method): string
    {
        return Str::finish($this->getViewPrefix(), '.') . $method->value;
    }

    public function getEntityActions(): array
    {
        return [
            $this->getViewPrefix() . '.actions.show',
            $this->getViewPrefix() . '.actions.edit',
            $this->getViewPrefix() . '.actions.destroy',
        ];
    }

    protected function getViewPrefix(): string
    {
        return 'crud';
    }

    public function getRouteByMethod(Method $method)
    {
        if (!in_array($method, $this->methods)) {
            return null;
        }

        return Str::finish($this->getRouteName(), '.') . $method->value;
    }
}
