<?php

namespace App\Eloquent\Models\Site\Blog;

use App\Eloquent\Casts\ContentCast;
use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use App\Eloquent\Models\Image;
use App\Eloquent\Models\Site\Site;
use App\Eloquent\Models\User;
use App\Enums\Post\Featured;
use App\Enums\Post\Status;
use App\Rules\ContentRule;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class Post extends Model implements HasTranslation, HasValidation
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'site_blog_posts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'site_id',
        'user_id',
        'category_id',
        'featured',
        'status',
        'image_id',
        'title',
        'slug',
        'description',
        'meta_image_id',
        'meta_title',
        'meta_description',
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
            'site_id' => [
                'required',
                Rule::exists(Site::class, 'id'),
            ],
            'user_id' => [
                'required',
                Rule::exists(User::class, 'id'),
            ],
            'category_id' => [
                'nullable',
                Rule::exists(Category::class, 'id')
                    ->where('site_id', $this->site_id),
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
                Rule::unique(Post::class, 'slug')
                    ->where('site_id', $this->site_id)
                    ->ignore($this->id)
                    ->withoutTrashed(),
            ],
            'description' => [
                'required',
                'string',
                'max:500',
            ],
            'meta_image_id' => [
                'nullable',
                Rule::exists(Image::class, 'id'),
            ],
            'meta_title' => [
                'nullable',
                'string',
                'max:255',
            ],
            'meta_description' => [
                'nullable',
                'string',
                'max:255',
            ],
            'content' => [
                'required',
                'string',
                new ContentRule(),
            ],
        ];
    }

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class, 'site_id', 'id');
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

    public function metaImage(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'meta_image_id', 'id');
    }

    public function images(): BelongsToMany
    {
        return $this->morphToMany(Image::class, 'entity', 'image_entity');
    }
}
