<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Page;

class PageRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return Page::class;
    }
}
