<?php

namespace App\Eloquent\Repositories\Criteria;

use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class LimitCriteria implements Criteria
{
    protected int $limit;

    public function __construct(int $limit)
    {
        $this->limit = $limit;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->limit($this->limit);
    }
}
