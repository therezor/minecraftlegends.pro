<?php

namespace App\Eloquent\Repositories\Criteria\Posts;

use App\Eloquent\Repositories\Contracts\Criteria;
use App\Enums\Post\Featured;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class FeaturedCriteria implements Criteria
{
    protected Featured $featured;

    public function __construct(Featured $featured)
    {
        $this->featured = $featured;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->where('featured', $this->featured->value);
    }
}
