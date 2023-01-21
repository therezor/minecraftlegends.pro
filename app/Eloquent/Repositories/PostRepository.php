<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Post;
use App\Eloquent\Models\User;
use App\Enums\Content\Type;
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

            $this->syncImages($post);

            return $post;
        });
    }

    public function update(string $id, array $attributes): Model
    {
        return DB::transaction(function () use ($id, $attributes) {
            /** @var Post $post */
            $post = parent::update($id, $attributes);

            $this->syncImages($post);

            return $post;
        });
    }

    public function vote(Post $post, User $user, int $points): Post
    {
        $post->votes()->syncWithPivotValues([$user->id], ['points' => $points], false);

        return $post;
    }

    protected function syncImages(Post $post)
    {
        $content = $post->content;
        if (!$content) {
            return;
        }

        $imageIds = $post->content->blocks()->where('type', Type::IMAGE->value)->pluck('data.file.id');
        $post->images()->sync($imageIds);
    }
}
