<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Blog\Category;

class CategoryController extends Controller
{
    public function show(Category $category)
    {
        $this->seo()->setTitle($category->name);

        $posts = $category->posts()->published()->latest()->simplePaginate(15);

        return view('blog.categories.show', ['category' => $category, 'posts' => $posts]);
    }
}
