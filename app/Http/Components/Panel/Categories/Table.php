<?php

namespace App\Http\Components\Panel\Categories;

use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\FilterCriteria;
use App\Eloquent\Repositories\Criteria\WithCountCriteria;
use App\Enums\Role\Permission;
use App\Http\Components\Panel\BaseTable;

class Table extends BaseTable
{
    protected CategoryRepository $repository;

    public function booted(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function render()
    {
        $searchCriteria = (new FilterCriteria($this->search))
            ->whereExact('id')
            ->whereLike('name')
            ->whereLike('created_at');

        $items = $this->repository->pushCriteria(new OrderByCriteria($this->sortBy, $this->sortDirection))
            ->pushCriteria(new WithCountCriteria('posts'))
            ->pushCriteria($searchCriteria)
            ->paginate();

        return view('components.panel.categories.table', compact('items'));
    }

    public function delete($id)
    {
        $this->authorize(Permission::CATEGORIES_DELETE->value);

        $this->repository->delete($id);
    }
}
