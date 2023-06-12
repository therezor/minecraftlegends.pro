<?php

namespace App\Models\Content;

use App\Enums\Content\Page\Template;
use App\Models\Traits\HasPath;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Content\Page
 *
 * @property string $id
 * @property string $layout_id
 * @property string $title
 * @property array $content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Content\Layout $layout
 * @property-read \App\Models\MetaTag|null $meta
 * @property-read \App\Models\Path|null $slug
 * @method static \Illuminate\Database\Eloquent\Builder|Page newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Page newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Page onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Page query()
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereLayoutId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Page withoutTrashed()
 * @mixin \Eloquent
 */
class Page extends Model
{
    use HasUuids;
    use SoftDeletes;
    use HasPath;

    protected $table = 'pages';

    protected $fillable = [
        'template',
        'name',
        'content',
    ];

    protected $casts = [
        'name' => 'string',
        'content' => 'array',
        'template' => Template::class,
    ];
}
