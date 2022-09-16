<?php

namespace App\Http\Controllers\Panel;

use App\Enums\Roles\Permission;

class PostController extends BaseCrudController
{
    public function __construct()
    {
        $this->middleware('can:' . Permission::POSTS_LIST->value, ['only' => 'index']);
        $this->middleware('can:' . Permission::POSTS_CREATE->value, ['only' => ['create']]);
        $this->middleware('can:' . Permission::POSTS_EDIT->value, ['only' => ['edit']]);
    }

    protected function crudName(): string
    {
        return __('Posts');
    }
}
