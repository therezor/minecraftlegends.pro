<?php

namespace App\Eloquent\Models;

use App\Enums\Menu\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
