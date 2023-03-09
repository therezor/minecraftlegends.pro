<?php

namespace App\Http\Controllers\Admin;

use App\Eloquent\Models\Post;
use App\Enums\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Admin\PostCrud;

class PostController extends BaseCrudController
{
    public function __construct(PostCrud $crud)
    {
        $this->middleware('can:' . Permission::ADMIN_POSTS_LIST->value, ['only' => ['index', 'show']]);
        $this->middleware('can:' . Permission::ADMIN_POSTS_CREATE->value, ['only' => ['create']]);
        $this->middleware('can:' . Permission::ADMIN_POSTS_EDIT->value, ['only' => ['edit']]);
        $this->middleware('can:' . Permission::ADMIN_POSTS_DELETE->value, ['only' => 'destroy']);

        $this->crud = $crud;
    }

    public function show(...$params)
    {
        $id = end($params);
        /** @var Post $entity */
        $entity = $this->crud->getRepository()->findOrFail($id);

        return redirect()->route('posts.show', $entity->slug);
    }
}
