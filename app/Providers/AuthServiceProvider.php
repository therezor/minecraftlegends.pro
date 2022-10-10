<?php

namespace App\Providers;

use App\Eloquent\Models\User;
use App\Enums\Role\Permission;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

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
                fn(User $user) => in_array($permission->value, $user->role->permissions, true)
            );
        }
    }
}
