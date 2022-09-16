<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Post;

class PostRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return Post::class;
    }
}
