<?php

namespace App\Models\Access;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\Permission\Models\Permission as Model;

class Permission extends Model
{
    use HasUuids;

    protected $table = 'roles';
}
