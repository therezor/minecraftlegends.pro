<?php

namespace App\Http\Controllers\Sites\Blog;

use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Sites\Blog\PostCrud;

class PostController extends BaseCrudController
{
    public function __construct(PostCrud $crud)
    {
        $this->crud = $crud;
    }
}
