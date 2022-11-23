<?php

namespace App\Eloquent\Models;

use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use App\Enums\Block\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Mews\Purifier\Casts\CleanHtml;

/**
 * App\Eloquent\Models\Block
 *
 * @property int $id
 * @property int $post_id
 * @property Type $type
 * @property int $display_order
 * @property string|null $title
 * @property array|null $description
 * @property int|null $image_id
 * @property array|null $data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Eloquent\Models\Post $post
 * @method static \Illuminate\Database\Eloquent\Builder|Block newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Block newQuery()
 * @method static \Illuminate\Database\Query\Builder|Block onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Block query()
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereDisplayOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereImageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Block whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Block withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Block withoutTrashed()
 * @mixin \Eloquent
 */
class Block extends Model implements HasTranslation, HasValidation
{
    use SoftDeletes;

    protected $table = 'blocks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'post_id',
        'type',
        'display_order',
        'title',
        'description',
        'data',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'type' => Type::class,
        'display_order' => 'int',
        'description' => CleanHtml::class,
        'data' => 'json',
    ];

    public function getTranslationPrefix(): string
    {
        return 'attributes';
    }

    public function getValidationRules(): array
    {
        return [
            'post_id' => [
                'required',
                Rule::exists(Post::class, 'id'),
            ],
            'type' => [
                'required',
                new Enum(Type::class),
            ],
            'display_order' => [
                'required',
                'int',
                'min:0',
                'max:255',
            ],
            'title' => [
                'nullable',
                'string',
                'max:255',
            ],
            'description' => [
                'nullable',
                'string',
                'max:65000',
            ],
            'data' => [
                'nullable',
                'json',
            ],
        ];
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'post_id', 'id');
    }
}
