<?php

namespace App\Eloquent\Repositories\Criteria;

use App\Eloquent\Models\Site\Site;
use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class BelongsToSiteCriteria implements Criteria
{
    protected Site $site;

    public function __construct(Site $site)
    {
        $this->site = $site;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->where('site_id', $this->site->id);
    }
}
