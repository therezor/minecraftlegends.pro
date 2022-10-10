<?php

namespace App\Http\Controllers\Panel;

use App\Enums\Role\Permission;

class RoleController extends BaseCrudController
{
    public function __construct()
    {
        $this->middleware('can:' . Permission::ROLES_LIST->value, ['only' => 'index']);
        $this->middleware('can:' . Permission::ROLES_CREATE->value, ['only' => ['create']]);
        $this->middleware('can:' . Permission::ROLES_EDIT->value, ['only' => ['edit']]);
    }

    protected function crudName(): string
    {
        return __('Roles');
    }
}
