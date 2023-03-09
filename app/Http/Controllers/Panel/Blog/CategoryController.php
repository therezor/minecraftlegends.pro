<?php

namespace App\Http\Controllers\Panel\Blog;

use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\Blog\CategoryCrud;

class CategoryController extends BaseCrudController
{
    public function __construct(CategoryCrud $crud)
    {
        $this->crud = $crud;
    }
}
