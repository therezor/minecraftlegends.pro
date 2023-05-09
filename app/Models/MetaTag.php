<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * App\Models\MetaTag
 *
 * @property string $id
 * @property string $entity_type
 * @property string $entity_id
 * @property string|null $title
 * @property string|null $image
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read Model|\Eloquent $entity
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag query()
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag whereEntityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag whereEntityType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|MetaTag withoutTrashed()
 * @mixin \Eloquent
 */
class MetaTag extends Model
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'meta_tags';

    protected $fillable = [
        'title',
        'description',
        'image',
    ];

    protected $casts = [
        'title' => 'string',
        'description' => 'string',
        'image' => 'string',
    ];

    public function entity(): MorphTo
    {
        return $this->morphTo();
    }
}
