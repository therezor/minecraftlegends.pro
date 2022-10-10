<?php

namespace App\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Eloquent\Models\Image
 *
 * @property int $id
 * @property string $disk
 * @property string $directory
 * @property string $filename
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $thumbnail
 * @property-read mixed $url
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquent\Models\Post[] $posts
 * @property-read int|null $posts_count
 * @method static \Illuminate\Database\Eloquent\Builder|Image newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Image newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Image query()
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereDirectory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereDisk($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Image extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'disk',
        'directory',
        'filename',
    ];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'image_id', 'id');
    }

    public function getUrlAttribute()
    {
        return url('/storage/' . $this->directory . $this->filename);
    }

    public function getThumbnailAttribute()
    {
        return url('/storage/' . $this->directory . 'thumbnail_' . $this->filename);
    }
}
