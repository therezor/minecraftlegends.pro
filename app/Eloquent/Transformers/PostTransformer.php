<?php

namespace App\Eloquent\Transformers;

use App\Eloquent\Models\Block;
use App\Eloquent\Models\Post;

class PostTransformer
{
    protected Post $post;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->post->id,
            'user_id' => $this->post->user_id,
            'featured' => $this->post->featured->value,
            'status' => $this->post->status->value,
            'per_page' => $this->post->per_page,
            'image_id' => $this->post->image_id,
            'title' => $this->post->title,
            'slug' => $this->post->slug,
            'description' => $this->post->description,
            'og_image_id' => $this->post->og_image_id,
            'og_title' => $this->post->og_title,
            'og_description' => $this->post->og_description,
            'category_id' => $this->post->category_id,
            'blocks' => $this->post->blocks
                ->map(fn (Block $block) => (new BlockTransformer($block))->toArray())
                ->toArray(),
        ];
    }
}
