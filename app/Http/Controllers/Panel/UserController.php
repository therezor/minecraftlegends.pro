<?php

namespace App\Http\Controllers\Panel;

use App\Enums\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\UserCrud;

class UserController extends BaseCrudController
{
    public function __construct(UserCrud $crud)
    {
        $this->crud = $crud;

        $this->middleware('can:' . Permission::USERS_LIST->value, ['only' => 'index']);
        $this->middleware('can:' . Permission::USERS_CREATE->value, ['only' => ['create']]);
        $this->middleware('can:' . Permission::USERS_EDIT->value, ['only' => ['edit']]);
    }
}
