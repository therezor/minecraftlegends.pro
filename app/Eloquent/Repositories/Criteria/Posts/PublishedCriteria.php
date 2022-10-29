<?php

namespace App\Eloquent\Repositories\Criteria\Posts;

use App\Eloquent\Repositories\Contracts\Criteria;
use App\Enums\Post\Status;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class PublishedCriteria implements Criteria
{
    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->where('status', Status::PUBLISHED->value);
    }
}
