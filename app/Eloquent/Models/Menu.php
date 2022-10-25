<?php

namespace App\Eloquent\Models;

use App\Enums\Menu\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Eloquent\Models\Menu
 *
 * @property Type $type
 * @method static \Illuminate\Database\Eloquent\Builder|Menu newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Menu newQuery()
 * @method static \Illuminate\Database\Query\Builder|Menu onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Menu query()
 * @method static \Illuminate\Database\Query\Builder|Menu withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Menu withoutTrashed()
 * @mixin \Eloquent
 */
class Menu extends Model
{
    use SoftDeletes;

    protected $table = 'menus';

    protected $fillable = [
        'type',
        'title',
        'url',
        'target',
        'is_active',
        'order',
        'icon',
    ];

    protected $casts = [
        'type' => Type::class,
        'is_active' => 'bool',
    ];
}
