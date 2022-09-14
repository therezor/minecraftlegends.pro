<?php

namespace App\Http\Components\Panel\Roles;

use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\SearchCriteria;
use App\Eloquent\Repositories\Criteria\WithCountCriteria;
use App\Eloquent\Repositories\RoleRepository;
use App\Http\Components\Traits\WithSorting;
use Livewire\Component;
use Livewire\WithPagination;

class Table extends Component
{
    use WithPagination;
    use WithSorting;

    public string $search = '';

    protected $queryString = [
        'search' => [
            'except' => '',
        ],
        'sortBy' => [
            'except' => 'id',
        ],
        'sortDirection' => [
            'except' => 'desc',
        ],
    ];

    protected RoleRepository $repository;

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function mount()
    {
        $this->sortBy = 'id';
        $this->sortDirection = 'desc';
    }

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
        $this->repository->delete($id);
    }
}
