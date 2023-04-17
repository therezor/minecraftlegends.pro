<?php

namespace App\Models\Blog;

use App\Eloquent\Casts\ContentCast;
use App\Enums\Blog\Post\Status;
use App\Models\Access\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'blog_posts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'is_featured',
        'status',
        'image',
        'title',
        'slug',
        'description',
        'meta_image',
        'meta_title',
        'meta_description',
        'content',
        'published_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_featured' => 'bool',
        'status' => Status::class,
        'content' => ContentCast::class,
        'published_at' => 'timestamp',
    ];

    protected $attributes = [
        'is_featured' => false,
        'status' => Status::DRAFT,
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
