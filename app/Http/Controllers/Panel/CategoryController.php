<?php

namespace App\Http\Controllers\Panel;

use App\Enums\Access\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\CategoryCrud;

class CategoryController extends BaseCrudController
{
    public function __construct(CategoryCrud $crud)
    {
        $this->middleware('can:' . Permission::CATEGORIES_LIST->value, ['only' => ['index', 'show']]);
        $this->middleware('can:' . Permission::CATEGORIES_CREATE->value, ['only' => ['create', 'store']]);
        $this->middleware('can:' . Permission::CATEGORIES_EDIT->value, ['only' => ['edit', 'update']]);
        $this->middleware('can:' . Permission::CATEGORIES_DELETE->value, ['only' => 'destroy']);

        $this->crud = $crud;
    }
}
