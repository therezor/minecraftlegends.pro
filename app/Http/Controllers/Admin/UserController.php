<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\UserCrud;

class UserController extends BaseCrudController
{
    public function __construct(UserCrud $crud)
    {
        $this->middleware('can:' . Permission::ADMIN_USERS_LIST->value, ['only' => ['index', 'show']]);
        $this->middleware('can:' . Permission::ADMIN_USERS_CREATE->value, ['only' => ['create', 'store']]);
        $this->middleware('can:' . Permission::ADMIN_USERS_EDIT->value, ['only' => ['edit', 'update']]);
        $this->middleware('can:' . Permission::ADMIN_USERS_DELETE->value, ['only' => 'destroy']);

        $this->crud = $crud;
    }
}
