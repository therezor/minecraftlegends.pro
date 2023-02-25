<?php

namespace App\Eloquent\Repositories\Site;

use App\Eloquent\Models\Site\Site;
use App\Eloquent\Repositories\BaseRepository;

class SiteRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return Site::class;
    }
}
