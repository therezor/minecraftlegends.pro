<?php

namespace App\Panel\Resources\Traits;

use App\Enums\Access\Role\Permission;
use Filament\Facades\Filament;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;

trait HasPermission
{
    protected static abstract function getPermission(): Permission;

    public static function can(string $action, ?Model $record = null): bool
    {
        $user = Filament::auth()->user();
        $model = static::getModel();
        $permission = static::getPermission();

        return Gate::forUser($user)->check($permission->value, $record ?? $model);
    }
}
