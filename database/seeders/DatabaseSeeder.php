<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Eloquent\Repositories\RoleRepository;
use App\Eloquent\Repositories\UserRepository;
use App\Enums\Roles\Type;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(UserRepository $userRepository, RoleRepository $roleRepository)
    {
        $roleRepository->create([
            'name' => 'Default',
            'type' => Type::DEFAULT,
            'permissions' => [],
        ]);

        $roleRepository->create([
            'name' => 'Super admin',
            'type' => Type::SUPER_ADMIN,
            'permissions' => [],
        ]);

        $userRepository->create([
            'name' => 'Super admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => '12345678',
            'role_id' => $roleRepository->findBy('type', Type::SUPER_ADMIN)->id,
        ]);
    }
}
