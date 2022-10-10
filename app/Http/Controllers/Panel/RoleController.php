<?php

namespace App\Http\Controllers\Panel;

use App\Enums\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\RoleCrud;

class RoleController extends BaseCrudController
{
    public function __construct(RoleCrud $crud)
    {
        $this->middleware('can:' . Permission::ROLES_LIST->value, ['only' => ['index', 'show']]);
        $this->middleware('can:' . Permission::ROLES_CREATE->value, ['only' => ['create', 'store']]);
        $this->middleware('can:' . Permission::ROLES_EDIT->value, ['only' => ['edit', 'update']]);
        $this->middleware('can:' . Permission::ROLES_DELETE->value, ['only' => 'destroy']);

        $this->crud = $crud;
    }
}
