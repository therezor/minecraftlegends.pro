<?php

namespace App\Http\Controllers\Panel;

use App\Enums\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\PostCrud;

class PostController extends BaseCrudController
{
    public function __construct(PostCrud $crud)
    {
        $this->middleware('can:' . Permission::POSTS_LIST->value, ['only' => ['index', 'show']]);
        $this->middleware('can:' . Permission::POSTS_CREATE->value, ['only' => ['create']]);
        $this->middleware('can:' . Permission::POSTS_EDIT->value, ['only' => ['edit']]);
        $this->middleware('can:' . Permission::POSTS_DELETE->value, ['only' => 'destroy']);

        $this->crud = $crud;
    }

    public function create()
    {
        $entity = $this->crud->getRepository()->newModel();
        $entity->user_id = auth()->id();

        return view('panel.posts.create')
            ->with('entity', $entity)
            ->with('crud', $this->crud);
    }

    public function edit($id)
    {
        $entity = $this->crud->getRepository()->findOrFail($id);

        return view('panel.posts.edit')
            ->with('entity', $entity)
            ->with('crud', $this->crud);
    }

    public function show($id)
    {
        $entity = $this->crud->getRepository()->findOrFail($id);

        return redirect()->route('posts.show', $entity->slug);
    }
}
