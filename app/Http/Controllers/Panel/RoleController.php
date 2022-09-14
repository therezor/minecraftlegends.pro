<?php

namespace App\Http\Controllers\Panel;

use App\Eloquent\Repositories\RoleRepository;

class RoleController extends BaseCrudController
{
    protected RoleRepository $repository;

    public function __construct(RoleRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function crudName(): string
    {
        return __('Roles');
    }
}
