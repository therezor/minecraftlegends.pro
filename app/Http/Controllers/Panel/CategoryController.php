<?php

namespace App\Http\Controllers\Panel;

use App\Enums\Role\Permission;

class CategoryController extends BaseCrudController
{
    public function __construct()
    {
        $this->middleware('can:' . Permission::CATEGORIES_LIST->value, ['only' => 'index']);
        $this->middleware('can:' . Permission::CATEGORIES_CREATE->value, ['only' => ['create']]);
        $this->middleware('can:' . Permission::CATEGORIES_EDIT->value, ['only' => ['edit']]);
    }

    protected function crudName(): string
    {
        return __('Categories');
    }
}
