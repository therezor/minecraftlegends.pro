<?php

namespace App\Fields\Traits;

use Illuminate\Http\Request;
use App\Eloquent\Repositories\Contracts\SortableCriteria;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;

trait Sortable
{
    protected $sortable = false;

    protected $sortDirection = null;

    protected $defaultSortOrder = 'desc';

    /** @var SortableCriteria */
    protected $sortableCriteria = null;

    public function sortable(bool $sortable = true, SortableCriteria $criteria = null): self
    {
        $this->sortable = $sortable;
        $this->sortableCriteria = $criteria;

        return $this;
    }

    public function isSortable(): bool
    {
        return $this->sortable;
    }

    public function defaultSortOrder($direction)
    {
        $this->defaultSortOrder = $direction;
    }

    public function sortableUrl(Request $request, $except = ['sort', 'direction', 'page'])
    {
        if (!$this->sortable) {
            return null;
        }

        $requestParams = $request->except($except);

        $direction = $this->getSortDirection() ?? $this->defaultSortOrder;

        $queryString = http_build_query(array_merge($requestParams, [
            'sort'      => $this->getName(),
            'direction' => ('desc' === $direction ? 'asc' : 'desc'),
        ]));

        return url($request->path() . '?' . $queryString);
    }

    public function setSortDirection($direction)
    {
        $this->sortDirection = $direction;
    }

    public function getSortDirection()
    {
        return $this->sortDirection;
    }

    public function getSortableCriteria(): SortableCriteria
    {
        if (!$this->sortableCriteria) {
            $this->sortableCriteria = new OrderByCriteria($this->getName(), $this->sortDirection);
        }

        $this->sortableCriteria->setDirection($this->sortDirection);

        return $this->sortableCriteria;
    }
}
