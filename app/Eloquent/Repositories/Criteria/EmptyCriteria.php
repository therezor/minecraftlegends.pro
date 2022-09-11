<?php

namespace App\Eloquent\Repositories\Criteria;

use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Criteria;
use App\Eloquent\Repositories\Contracts\Repository;

class EmptyCriteria implements Criteria
{
    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder;
    }
}
