<?php

namespace Database\Seeders;

use App\Eloquent\Repositories\RoleRepository;
use App\Eloquent\Repositories\UserRepository;
use App\Enums\Role\Permission;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(UserRepository $userRepository, RoleRepository $roleRepository)
    {
        $permission = $roleRepository->create([
            'name' => 'Super admin',
            'permissions' => Permission::cases(),
        ]);

        $userRepository->create([
            'name' => 'Super admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => '12345678',
            'role_id' => $permission->id,
        ]);
    }
}
