<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Post;
use App\Eloquent\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PostRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return Post::class;
    }

    public function create(array $attributes): Model
    {
        return DB::transaction(function () use ($attributes) {
            /** @var Post $post */
            $post = parent::create($attributes);

            $this->saveBlocks($post, $attributes);

            return $post;
        });
    }

    public function update(string $id, array $attributes): Model
    {
        return DB::transaction(function () use ($id, $attributes) {
            /** @var Post $post */
            $post = parent::update($id, $attributes);

            $this->saveBlocks($post, $attributes);

            return $post;
        });
    }

    public function vote(Post $post, User $user, int $points): Post
    {
        $post->votes()->syncWithPivotValues([$user->id], ['points' => $points], false);

        return $post;
    }

    protected function saveBlocks(Post $post, array $attributes)
    {

    }
}
