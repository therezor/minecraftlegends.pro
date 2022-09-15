<?php

namespace App\Http\Components\Panel\Users;

use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\SearchCriteria;
use App\Eloquent\Repositories\UserRepository;
use App\Enums\Roles\Permission;
use App\Http\Components\Panel\BaseTable;

class Table extends BaseTable
{
    protected UserRepository $repository;

    public function booted(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function render()
    {
        $searchCriteria = (new SearchCriteria($this->search))
            ->whereExact('id')
            ->whereLike('name')
            ->whereLike('email')
            ->whereLike('created_at');

        $items = $this->repository->pushCriteria(new OrderByCriteria($this->sortBy, $this->sortDirection))
            ->pushCriteria($searchCriteria)
            ->paginate();

        return view('components.panel.users.table', compact('items'));
    }

    public function delete($id)
    {
        $this->authorize(Permission::USERS_DELETE->value);

        $this->repository->delete($id);
    }
}
