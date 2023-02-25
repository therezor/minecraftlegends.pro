<?php

namespace App\Eloquent\Repositories\Criteria\Posts;

use App\Eloquent\Models\PostCategory;
use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class InCategoryCriteria implements Criteria
{
    protected PostCategory $category;

    public function __construct(PostCategory $category)
    {
        $this->category = $category;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->where('category_id', $this->category->id);
    }
}
