<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * App\Models\Slug
 *
 * @property string $slug
 * @property string $entity_type
 * @property string $entity_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read Model|\Eloquent $entity
 * @method static \Illuminate\Database\Eloquent\Builder|Slug newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Slug newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Slug onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Slug query()
 * @method static \Illuminate\Database\Eloquent\Builder|Slug whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slug whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slug whereEntityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slug whereEntityType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slug whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slug whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slug withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Slug withoutTrashed()
 * @mixin \Eloquent
 */
class Slug extends Model
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'slugs';

    protected $fillable = [
        'slug',
    ];

    protected $casts = [
        'slug' => 'string',
    ];

    public function entity(): MorphTo
    {
        return $this->morphTo();
    }
}
