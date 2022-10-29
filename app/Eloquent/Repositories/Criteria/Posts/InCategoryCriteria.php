<?php

namespace App\Eloquent\Repositories\Criteria\Posts;

use App\Eloquent\Models\Category;
use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class InCategoryCriteria implements Criteria
{
    protected Category $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->where('category_id', $this->category->id);
    }
}
