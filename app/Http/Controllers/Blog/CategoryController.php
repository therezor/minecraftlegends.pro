<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Blog\Category;

class CategoryController extends Controller
{
    public function show(Category $category)
    {
        $this->seo()->setTitle($category->name);

        return view('page', ['page' => $category]);
    }
}
