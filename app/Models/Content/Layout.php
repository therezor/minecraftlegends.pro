<?php

namespace App\Models\Content;

use App\Enums\Content\Layout\Type;
use App\Models\Traits\HasSlugAndMeta;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Content\Layout
 *
 * @property string $id
 * @property string $name
 * @property Type $type
 * @property array $before_content
 * @property array $after_content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\MetaTag|null $meta
 * @property-read \App\Models\Slug|null $slug
 * @method static \Illuminate\Database\Eloquent\Builder|Layout newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Layout newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Layout onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Layout query()
 * @method static \Illuminate\Database\Eloquent\Builder|Layout whereAfterContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Layout whereBeforeContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Layout whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Layout whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Layout whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Layout whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Layout whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Layout whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Layout withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Layout withoutTrashed()
 * @mixin \Eloquent
 */
class Layout extends Model
{
    use HasUuids;
    use SoftDeletes;
    use HasSlugAndMeta;

    protected $table = 'layouts';

    protected $fillable = [
        'name',
        'type',
        'before_content',
        'after_content',
    ];

    protected $casts = [
        'name' => 'string',
        'type' => Type::class,
        'before_content' => 'array',
        'after_content' => 'array',
    ];
}
