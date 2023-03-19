<?php

namespace App\Eloquent\Repositories\Site;

use App\Eloquent\Models\Site\Page;
use App\Eloquent\Repositories\BaseRepository;

class PageRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return Page::class;
    }
}
