<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Role;

class RoleRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return Role::class;
    }

    public function select()
    {
        return $this->newQuery()->pluck('name', 'id')->all();
    }
}
