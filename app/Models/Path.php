<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

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
 * @method static \Illuminate\Database\Eloquent\Builder|Path newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Path newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Path onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Path query()
 * @method static \Illuminate\Database\Eloquent\Builder|Path whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Path whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Path whereEntityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Path whereEntityType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Path whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Path whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Path withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Path withoutTrashed()
 * @mixin \Eloquent
 */
class Path extends Model
{
    protected $table = 'paths';

    protected $primaryKey = 'slug';

    protected $fillable = [
        'slug',
        'meta_title',
        'meta_description',
        'meta_image',
    ];

    protected $casts = [
        'slug' => 'string',
        'meta_title' => 'string',
        'meta_description' => 'string',
        'meta_image' => 'string',
    ];

    public function entity(): MorphTo
    {
        return $this->morphTo();
    }
}
