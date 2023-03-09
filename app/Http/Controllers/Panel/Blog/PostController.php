<?php

namespace App\Http\Controllers\Panel\Blog;

use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\Blog\PostCrud;

class PostController extends BaseCrudController
{
    public function __construct(PostCrud $crud)
    {
        $this->crud = $crud;
    }
}
