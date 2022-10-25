<?php

namespace App\Eloquent\Models;

use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use App\Enums\Post\Featured;
use App\Enums\Post\Status;
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
 * @property int $id
 * @property int $user_id
 * @property Featured|null $featured
 * @property Status|null $status
 * @property int|null $per_page
 * @property int|null $image_id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property int|null $og_image_id
 * @property string|null $og_title
 * @property string|null $og_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquent\Models\Block[] $blocks
 * @property-read int|null $blocks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquent\Models\Category[] $categories
 * @property-read int|null $categories_count
 * @property-read \App\Eloquent\Models\Image|null $image
 * @property-read \App\Eloquent\Models\Image|null $ogImage
 * @property-read \App\Eloquent\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Post newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Post newQuery()
 * @method static \Illuminate\Database\Query\Builder|Post onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Post query()
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
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
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
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'featured' => Featured::class,
        'status' => Status::class,
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
            'featured' => [
                'required',
                new Enum(Featured::class),
            ],
            'status' => [
                'required',
                new Enum(Status::class),
            ],
            'per_page' => [
                'nullable',
                'int',
                'min:1',
                'max:10',
            ],
            'image_id' => [
                'nullable',
                Rule::exists(Image::class, 'id'),
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

    public function user(): BelongsTo
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

    public function blocks(): HasMany
    {
        return $this->hasMany(Block::class, 'post_id', 'id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'post_category', 'post_id', 'category_id');
    }
}
