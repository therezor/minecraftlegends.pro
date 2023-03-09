<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\CategoryCrud;

class CategoryController extends BaseCrudController
{
    public function __construct(CategoryCrud $crud)
    {
        $this->middleware('can:' . Permission::ADMIN_POST_CATEGORIES_LIST->value, ['only' => ['index', 'show']]);
        $this->middleware('can:' . Permission::ADMIN_POST_CATEGORIES_CREATE->value, ['only' => ['create', 'store']]);
        $this->middleware('can:' . Permission::ADMIN_POST_CATEGORIES_EDIT->value, ['only' => ['edit', 'update']]);
        $this->middleware('can:' . Permission::ADMIN_POST_CATEGORIES_DELETE->value, ['only' => 'destroy']);

        $this->crud = $crud;
    }
}
