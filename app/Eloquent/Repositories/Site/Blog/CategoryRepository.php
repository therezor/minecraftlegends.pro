<?php

namespace App\Eloquent\Repositories\Site\Blog;

use App\Eloquent\Models\Site\Blog\Category;
use App\Eloquent\Repositories\BaseRepository;

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
