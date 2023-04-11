<?php

namespace App\Eloquent\Repositories\Criteria\Posts;

use App\Eloquent\Repositories\Contracts\Criteria;
use App\Eloquent\Repositories\Contracts\Repository;
use App\Enums\Blog\Post\Status;
use Illuminate\Database\Eloquent\Builder;

class PublishedCriteria implements Criteria
{
    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->where('status', Status::PUBLISHED->value);
    }
}
