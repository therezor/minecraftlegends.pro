<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Admin\RoleCrud;

class RoleController extends BaseCrudController
{
    public function __construct(RoleCrud $crud)
    {
        $this->middleware('can:' . Permission::ADMIN_ROLES_LIST->value, ['only' => ['index', 'show']]);
        $this->middleware('can:' . Permission::ADMIN_ROLES_CREATE->value, ['only' => ['create', 'store']]);
        $this->middleware('can:' . Permission::ADMIN_ROLES_EDIT->value, ['only' => ['edit', 'update']]);
        $this->middleware('can:' . Permission::ADMIN_ROLES_DELETE->value, ['only' => 'destroy']);

        $this->crud = $crud;
    }
}
