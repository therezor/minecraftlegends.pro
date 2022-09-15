<?php

namespace App\Http\Controllers\Panel;

use App\Enums\Roles\Permission;

class UserController extends BaseCrudController
{
    public function __construct()
    {
        $this->middleware('can:' . Permission::USERS_LIST->value, ['only' => 'index']);
        $this->middleware('can:' . Permission::USERS_CREATE->value, ['only' => ['create']]);
        $this->middleware('can:' . Permission::USERS_EDIT->value, ['only' => ['edit']]);
    }

    protected function crudName(): string
    {
        return __('Users');
    }
}
