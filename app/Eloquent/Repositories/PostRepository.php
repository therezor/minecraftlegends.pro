<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Post;
use Illuminate\Database\Eloquent\Model;

class PostRepository extends BaseRepository
{
    public const YOUTUBE_REGEX = '/(youtu.be\/([a-zA-Z0-9_]+)\??)|(youtube.com\/((?:embed)|(?:watch))((?:\?v\=)|(?:\/))(\w+))/i';

    public function modelClass(): string
    {
        return Post::class;
    }

    /**
     * @inheritdoc
     */
    public function create(array $attributes): Model
    {
        $attributes = $this->convertVideoUrlToEmbed($attributes);

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

    /**
     * @param array<string, mixed> $attributes
     * @return array<string, mixed>
     */
    protected function convertVideoUrlToEmbed(array $attributes): array
    {
        if (!empty($attributes['video_url'])) {
            if (preg_match(static::YOUTUBE_REGEX, $attributes['video_url'], $matches)) {
                $youtubeId = end($matches);

                $attributes['video_url'] = 'https://www.youtube.com/embed/' . $youtubeId ;
            }
        }

        return $attributes;
    }
}
