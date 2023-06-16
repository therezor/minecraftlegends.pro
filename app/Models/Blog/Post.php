<?php

namespace App\Models\Blog;

use App\Enums\Blog\Post\Status;
use App\Models\Access\User;
use App\Models\Traits\HasPath;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Blog\Post
 *
 * @property string $id
 * @property string $user_id
 * @property string|null $category_id
 * @property string $layout_id
 * @property bool $is_featured
 * @property Status|null $status
 * @property string|null $image
 * @property string $title
 * @property string|null $description
 * @property array $content
 * @property int|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read User $author
 * @property-read \App\Models\Blog\Category|null $category
 * @property-read Layout $layout
 * @property-read \App\Models\MetaTag|null $meta
 * @property-read \App\Models\Path|null $slug
 * @method static \Illuminate\Database\Eloquent\Builder|Post newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Post newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Post onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Post query()
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereLayoutId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Post withoutTrashed()
 * @mixin \Eloquent
 */
class Post extends Model
{
    use HasUuids;
    use SoftDeletes;
    use HasPath;

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
        'description',
        'content',
        'published_at',
        'layout_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_featured' => 'bool',
        'status' => Status::class,
        'content' => 'array',
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

    public function scopePublished(Builder $query): void
    {
        $query->where('status', Status::PUBLISHED);
    }

    public function scopePrev(Builder $query, Post $post): void
    {
        $query->where('status', Status::PUBLISHED)
            ->where('id', '!=', $post->id)
            ->where('id', '<', $post->id)
            ->orderByRaw('category_id = ? desc', [$post->category_id])
            ->orderBy('id', 'desc');
    }

    public function scopeNext(Builder $query, Post $post): void
    {
        $query->where('status', Status::PUBLISHED)
            ->where('id', '!=', $post->id)
            ->where('id', '>', $post->id)
            ->orderByRaw('category_id = ? desc', [$post->category_id])
            ->orderBy('id', 'asc');
    }
}
