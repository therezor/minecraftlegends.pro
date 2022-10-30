<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Block;
use App\Eloquent\Models\Post;
use App\Eloquent\Models\User;
use App\Enums\Block\Type;
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
        foreach ($attributes['blocks'] ?? [] as $key => $data) {
            $type = Type::from($data['type']);

            $block = empty($data['id'])
                ? new Block()
                : $post->blocks()->find($data['id']);
            $block->post_id = $post->id;
            $block->display_order = $key;
            $block->type = $type;
            $block->title = $data['title'] ?? null;
            $block->description = $data['description'] ?? null;

            if ($type === Type::LIST) {
                $block->data = [
                    'counter' => $data['data']['counter'],
                ];
            }

            if ($type === Type::IMAGE) {
                $block->image_id = $data['image_id'];
                $block->data = [
                    'alt' => $data['data']['alt'] ?? null,
                    'caption' => $data['data']['caption'] ?? null,
                ];
            }

            if ($type === Type::VIDEO) {
                $block->data = [
                    'video_url' => $data['data']['video_url'],
                    'embed_code' => $data['data']['embed_code'],
                ];
            }

            $post->blocks()->save($block);
        }
    }
}
