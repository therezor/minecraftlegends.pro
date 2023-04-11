<?php

namespace App\Models\Access;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\Permission\Models\Role as Model;

class Role extends Model
{
    use HasUuids;

    protected $table = 'roles';
}
