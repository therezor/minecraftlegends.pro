<?php

namespace App\Http\Controllers\Panel;

use App\Enums\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\CategoryCrud;
use App\Http\Crud\Panel\PageCrud;

class PageController extends BaseCrudController
{
    public function __construct(PageCrud $crud)
    {
        $this->middleware('can:' . Permission::PAGES_LIST->value, ['only' => ['index', 'show']]);
        $this->middleware('can:' . Permission::PAGES_CREATE->value, ['only' => ['create', 'store']]);
        $this->middleware('can:' . Permission::PAGES_EDIT->value, ['only' => ['edit', 'update']]);
        $this->middleware('can:' . Permission::PAGES_DELETE->value, ['only' => 'destroy']);

        $this->crud = $crud;
    }
}
