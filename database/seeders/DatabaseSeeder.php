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
        $this->call(AdminSeeder::class);
        $this->call(PageSeeder::class);
    }
}
