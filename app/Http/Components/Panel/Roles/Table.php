<?php

namespace App\Http\Components\Panel\Roles;

use App\Eloquent\Repositories\RoleRepository;
use App\Enums\Role\Permission;
use App\Http\Components\Panel\BaseTable;
use App\Repositories\OrderByCriteria;
use App\Repositories\SearchCriteria;
use App\Repositories\WithCountCriteria;

class Table extends BaseTable
{
    protected RoleRepository $repository;

    public function booted(RoleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function render()
    {
        $searchCriteria = (new SearchCriteria($this->search))
            ->whereExact('id')
            ->whereLike('name')
            ->whereLike('created_at');

        $items = $this->repository->pushCriteria(new OrderByCriteria($this->sortBy, $this->sortDirection))
            ->pushCriteria(new WithCountCriteria('users'))
            ->pushCriteria($searchCriteria)
            ->paginate();

        return view('components.panel.roles.table', compact('items'));
    }

    public function delete($id)
    {
        $this->authorize(Permission::ROLES_DELETE->value);

        $this->repository->delete($id);
    }
}
