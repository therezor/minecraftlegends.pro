<?php

namespace App\Eloquent\Repositories\Criteria;

use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;
use App\Eloquent\Repositories\Contracts\SortableCriteria;

class OrderByCriteria implements SortableCriteria
{
    protected string $column;

    protected string $direction;

    public function __construct(string $column, string $direction = 'desc')
    {
        $this->column = $column;
        $this->direction = $direction;
    }

    public function setDirection(string $direction)
    {
        $this->direction = $direction;

        return $this;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->orderBy($this->column, $this->direction);
    }
}
