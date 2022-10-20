<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Post;
use Illuminate\Database\Eloquent\Model;

class PostRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return Post::class;
    }

    /**
     * @inheritdoc
     */
    public function create(array $attributes): Model
    {
        return parent::create($attributes);
    }

    /**
     * @inheritdoc
     */
    public function update(string $id, array $attributes): Model
    {
        $attributes = $this->convertVideoUrlToEmbed($attributes);

        return parent::update($id, $attributes);
    }
}
