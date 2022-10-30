<?php

namespace App\Eloquent\Repositories\Criteria;

use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class FilterCriteria implements Criteria
{
    protected array $callbacks = [];

    protected array $filters = [];

    public function __construct(array $filters)
    {
        $this->filters = $filters;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        if (!$this->filters) {
            return $builder;
        }

        return $builder->where(function (Builder $query) {
            foreach ($this->filters as $column => $value) {
                if ($this->hasCallback($column)) {
                    call_user_func(
                        $this->callbacks[$column], $query, $value, $this
                    );

                    continue;
                }

                $query->where($column, $value, $query);
            }
        });
    }

    public function callback($column, callable $callback): self
    {
        $this->callbacks[$column] = $callback;

        return $this;
    }

    public function whereIn($column): self
    {
        $this->callbacks[$column] = function (Builder $query, $value) use ($column) {
            return $query->whereIn($column, $value);
        };

        return $this;
    }

    public function whereLike($column): self
    {
        $this->callbacks[$column] = function (Builder $query, $value) use ($column) {
            return $query->where($column, 'like', '%' . $this->escapeLike($value) . '%');
        };

        return $this;
    }

    protected function escapeLike(string $column)
    {
        return addcslashes($column, '%_');
    }

    protected function hasCallback($column): bool
    {
        return isset($this->callbacks[$column]) && is_callable($this->callbacks[$column]);
    }
}
