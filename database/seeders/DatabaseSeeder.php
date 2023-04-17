<?php

namespace Database\Seeders;

use App\Enums\Access\Role\Permission;
use App\Models\Access\Role;
use App\Models\Access\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::updateOrCreate([
            'name' => 'Super admin',
        ], [
            'permissions' => Permission::cases(),
        ]);

        User::updateOrCreate([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => '12345678',
            'role_id' => $role->id,
        ], [
            'email_verified_at' => now(),
            'password' => '12345678',
            'role_id' => $role->id,
        ]);
    }
}
