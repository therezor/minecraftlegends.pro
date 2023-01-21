<?php

namespace App\Eloquent\Models;

use App\Eloquent\Casts\ContentCast;
use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use App\Enums\Post\Featured;
use App\Enums\Post\Status;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

/**
 * App\Eloquent\Models\Post
 *
 * @property string $id
 * @property string $user_id
 * @property Featured|null $featured
 * @property Status|null $status
 * @property string|null $category_id
 * @property int|null $per_page
 * @property string|null $image_id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property string|null $og_image_id
 * @property string|null $og_title
 * @property string|null $og_description
 * @property string $content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Eloquent\Models\User $author
 * @property-read \App\Eloquent\Models\Category|null $category
 * @property-read \App\Eloquent\Models\Image|null $image
 * @property-read \App\Eloquent\Models\Image|null $ogImage
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquent\Models\User[] $votes
 * @property-read int|null $votes_count
 * @method static \Illuminate\Database\Eloquent\Builder|Post newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Post newQuery()
 * @method static \Illuminate\Database\Query\Builder|Post onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Post query()
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereImageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereOgDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereOgImageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereOgTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post wherePerPage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|Post withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Post withoutTrashed()
 * @mixin \Eloquent
 */
class Post extends Model implements HasTranslation, HasValidation
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'posts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'featured',
        'status',
        'per_page',
        'image_id',
        'title',
        'slug',
        'description',
        'og_image_id',
        'og_title',
        'og_description',
        'content',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'featured' => Featured::class,
        'status' => Status::class,
        'content' => ContentCast::class,
    ];

    protected $attributes = [
        'featured' => Featured::DEFAULT,
        'status' => Status::DRAFT,
    ];

    public function getTranslationPrefix(): string
    {
        return 'attributes';
    }

    public function getValidationRules(): array
    {
        return [
            'user_id' => [
                'required',
                Rule::exists(User::class, 'id'),
            ],
            'category_id' => [
                'required',
                Rule::exists(Category::class, 'id'),
            ],
            'featured' => [
                'required',
                new Enum(Featured::class),
            ],
            'status' => [
                'required',
                new Enum(Status::class),
            ],
            'image' => [
                'nullable',
                'image',
                'max:10240',
            ],
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'slug' => [
                'required',
                'alpha_dash',
                'max:255',
                Rule::unique(Post::class, 'slug')->withoutTrashed()->ignore($this->id),
            ],
            'description' => [
                'required',
                'string',
                'max:500',
            ],
            'og_image_id' => [
                'nullable',
                Rule::exists(Image::class, 'id'),
            ],
            'og_title' => [
                'nullable',
                'string',
                'max:255',
            ],
            'og_description' => [
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'image_id', 'id');
    }

    public function ogImage(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'og_image_id', 'id');
    }

    public function votes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'post_votes', 'post_id', 'user_id')
            ->withPivot('points');
    }
}
