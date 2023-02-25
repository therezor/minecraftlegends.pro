<?php

namespace App\Eloquent\Repositories\Criteria;

use App\Eloquent\Models\User;
use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class OwnedByUserCriteria implements Criteria
{
    protected User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->where('user_id', $this->user->id);
    }
}
