<?php

namespace App\Eloquent\Models\Site;

use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;

/**
 * App\Eloquent\Models\PostCategory
 *
 * @property string $id
 * @property string $name
 * @property string $slug
 * @property int $display_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquent\Models\Post[] $posts
 * @property-read int|null $posts_count
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory newQuery()
 * @method static \Illuminate\Database\Query\Builder|PostCategory onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory whereDisplayOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|PostCategory withTrashed()
 * @method static \Illuminate\Database\Query\Builder|PostCategory withoutTrashed()
 * @mixin \Eloquent
 */
class PostCategory extends Model implements HasTranslation, HasValidation
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'space_post_categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'space_id',
        'name',
        'slug',
        'display_order',
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

            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique(PostCategory::class, 'name')->ignore($this->id)->withoutTrashed(),
            ],

            'slug' => [
                'required',
                'alpha_dash',
                'max:255',
                Rule::unique(PostCategory::class, 'slug')->withoutTrashed()->ignore($this->id),
            ],

            'display_order' => [
                'required',
                'integer',
                'min:0',
            ],
        ];
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'category_id', 'id');
    }

    public function space(): BelongsTo
    {
        return $this->belongsTo(Site::class, 'space_id', 'id');
    }
}
