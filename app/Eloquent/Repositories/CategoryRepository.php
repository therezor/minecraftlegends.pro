<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Category;

class CategoryRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return Category::class;
    }

    public function select()
    {
        return $this->newQuery()->pluck('name', 'id')->all();
    }
}
