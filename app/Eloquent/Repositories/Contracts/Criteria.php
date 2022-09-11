<?php

namespace App\Eloquent\Repositories\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface Criteria
{
    public function apply(Builder $builder, Repository $repository): Builder;
}
