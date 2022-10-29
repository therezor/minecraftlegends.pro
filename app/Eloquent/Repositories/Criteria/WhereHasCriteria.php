<?php

namespace App\Eloquent\Repositories\Criteria;

use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class WhereHasCriteria implements Criteria
{
    protected string $relation;

    public function __construct(string $relation)
    {
        $this->relation = $relation;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->whereHas($this->relation);
    }
}
