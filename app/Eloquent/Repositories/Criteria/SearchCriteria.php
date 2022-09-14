<?php

namespace App\Eloquent\Repositories\Criteria;

use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class SearchCriteria implements Criteria
{
    protected array $callbacks = [];

    protected string $search;

    public function __construct(string $search = '')
    {
        $this->search = $search;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        if (!$this->search) {
            return $builder;
        }

        return $builder->where(function (Builder $query) {
            foreach ($this->callbacks as $callback) {
                call_user_func(
                    $callback,
                    $query,
                );
            }
        });
    }

    public function whereExact($column): self
    {
        $this->callbacks[$column] = function (Builder $query) use ($column) {
            return $query->orWhere($column, 'ilike', $this->search);
        };

        return $this;
    }

    public function whereLike($column): self
    {
        $this->callbacks[$column] = function (Builder $query) use ($column) {
            return $query->orWhere($column, 'ilike', '%' . $this->escapeLike($this->search) . '%');
        };

        return $this;
    }

    protected function escapeLike(string $column): string
    {
        return addcslashes($column, '%_');
    }
}
