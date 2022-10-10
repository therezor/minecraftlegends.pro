<?php

namespace App\Http\Components\Panel\Posts;

use App\Eloquent\Repositories\PostRepository;
use App\Enums\Role\Permission;
use App\Http\Components\Panel\BaseTable;
use App\Repositories\OrderByCriteria;
use App\Repositories\SearchCriteria;

class Table extends BaseTable
{
    protected PostRepository $repository;

    public function booted(PostRepository $repository)
    {
        $this->repository = $repository;
    }

    public function render()
    {
        $searchCriteria = (new SearchCriteria($this->search))
            ->whereExact('id')
            ->whereExact('status')
            ->whereLike('title');

        $items = $this->repository->pushCriteria(new OrderByCriteria($this->sortBy, $this->sortDirection))
            ->pushCriteria($searchCriteria)
            ->paginate();

        return view('components.panel.posts.table', compact('items'));
    }

    public function delete($id)
    {
        $this->authorize(Permission::POSTS_DELETE->value);

        $this->repository->delete($id);
    }
}
