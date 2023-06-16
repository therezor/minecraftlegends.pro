<?php

namespace App\Providers;

use App\Enums\Access\Role\Permission;
use App\Models\Access\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        foreach (Permission::cases() as $permission) {
            Gate::define(
                $permission->value,
                fn(User $user) => in_array($permission->value, $user->role->permissions ?? [], true)
            );
        }
    }
}
