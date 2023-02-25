<?php

namespace App\Eloquent\Models\Site;

use App\Eloquent\Casts\ContentCast;
use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use App\Rules\ContentRule;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;

/**
 * App\Eloquent\Models\Page
 *
 * @property string $id
 * @property string $user_id
 * @property string $title
 * @property string $slug
 * @property \App\Eloquent\Casts\Dto\Content|null $content
 * @property string|null $description
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Eloquent\Models\User $author
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquent\Models\Image[] $images
 * @property-read int|null $images_count
 * @method static \Illuminate\Database\Eloquent\Builder|Page newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Page newQuery()
 * @method static \Illuminate\Database\Query\Builder|Page onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Page query()
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereOgDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereOgTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|Page withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Page withoutTrashed()
 * @mixin \Eloquent
 */
class Page extends Model implements HasTranslation, HasValidation
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'space_pages';

    protected $fillable = [
        'space_id',
        'user_id',
        'title',
        'slug',
        'content',
        'description',
        'meta_title',
        'meta_description',
        'content',
    ];

    protected $casts = [
        'content' => ContentCast::class,
    ];

    public function getTranslationPrefix(): string
    {
        return 'attributes';
    }

    public function getValidationRules(): array
    {
        return [
            'space_id' => [
                'required',
                Rule::exists(Site::class, 'id'),
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
                Rule::unique(Page::class, 'slug')->withoutTrashed()->ignore($this->id),
            ],
            'description' => [
                'nullable',
                'string',
                'max:500',
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

    public function space(): BelongsTo
    {
        return $this->belongsTo(Site::class, 'space_id', 'id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Image::class, 'image_page', 'page_id', 'image_id');
    }
}
