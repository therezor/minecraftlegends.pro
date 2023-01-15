<?php

namespace App\Eloquent\Models;

use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;

/**
 * App\Eloquent\Models\Page
 *
 * @property string $id
 * @property string $user_id
 * @property string $title
 * @property string $slug
 * @property string $content
 * @property string|null $description
 * @property string|null $og_title
 * @property string|null $og_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Eloquent\Models\User $author
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

    protected $table = 'pages';

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'content',
        'description',
        'og_title',
        'og_description',
        'content',
    ];

    public function getTranslationPrefix(): string
    {
        return 'attributes';
    }

    public function getValidationRules(): array
    {
        return [
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
            'content' => [
                'required',
                'string',
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

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
