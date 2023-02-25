<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\PostCategory;

class CategoryRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return PostCategory::class;
    }

    public function select()
    {
        return $this->newQuery()->pluck('name', 'id')->all();
    }
}
