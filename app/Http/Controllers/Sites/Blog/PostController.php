<?php

namespace App\Http\Controllers\Sites\Blog;

use App\Eloquent\Models\Post;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\PostCrud;

class PostController extends BaseCrudController
{
    public function __construct(PostCrud $crud)
    {
        $this->crud = $crud;
    }

    public function show($id)
    {
        /** @var Post $entity */
        $entity = $this->crud->getRepository()->findOrFail($id);

        return redirect()->route('posts.show', $entity->slug);
    }
}
