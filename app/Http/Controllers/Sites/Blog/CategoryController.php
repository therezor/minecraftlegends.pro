<?php

namespace App\Http\Controllers\Sites\Blog;

use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Sites\Blog\CategoryCrud;

class CategoryController extends BaseCrudController
{
    public function __construct(CategoryCrud $crud)
    {
        $this->crud = $crud;
    }
}
