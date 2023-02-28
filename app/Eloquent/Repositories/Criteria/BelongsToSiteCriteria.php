<?php

namespace App\Eloquent\Repositories\Criteria;

use App\Eloquent\Models\Site\Site;
use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Database\Eloquent\Builder;
use App\Eloquent\Repositories\Contracts\Repository;

class BelongsToSiteCriteria implements Criteria
{
    protected string $siteId;

    public function __construct(string|Site $site)
    {
        $this->siteId = ($site instanceof Site) ? $site->id : $site;
    }

    public function apply(Builder $builder, Repository $repository): Builder
    {
        return $builder->where('site_id', $this->siteId);
    }
}
