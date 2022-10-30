<?php

namespace App\Eloquent\Repositories\Criteria\Posts;

use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class SearchCriteria implements Criteria
{
    protected ?string $term;

    public function __construct(?string $term)
    {
        $this->term = $term;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        if (!$this->term) {
            return $builder;
        }

        return $builder->where(function (Builder $q) {
            $q->whereFullText('title', $this->term)
                ->orWhereFullText('description', $this->term)
                ->orWhereHas('blocks', function (Builder $q) {
                    $q->whereFullText('title', $this->term)
                        ->orWhereFullText('description', $this->term);
                });
        });
    }
}
