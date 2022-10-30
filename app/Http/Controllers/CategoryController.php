<?php

namespace App\Http\Controllers;

use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\Posts\InCategoryCriteria;
use App\Eloquent\Repositories\Criteria\Posts\PublishedCriteria;
use App\Eloquent\Repositories\PostRepository;

class CategoryController extends Controller
{
    protected CategoryRepository $categoryRepository;
    protected PostRepository $postRepository;

    public function __construct(CategoryRepository $categoryRepository, PostRepository $postRepository)
    {
        $this->categoryRepository = $categoryRepository;
        $this->postRepository = $postRepository;
    }

    public function show($slug)
    {
        $category = $this->categoryRepository->findByOrFail('slug', $slug);
        $posts = $this->postRepository->pushCriteria(new PublishedCriteria())
            ->pushCriteria(new InCategoryCriteria($category))
            ->pushCriteria(new OrderByCriteria('id'))
            ->paginate(20);

        $this->seo()->setTitle($category->name);
        $this->seo()->setDescription(__('Category') . ' ' . $category->name);
        $this->seo()->setCanonical(route('categories.show', $slug));

        return view('categories.show', ['category' => $category, 'posts' => $posts]);
    }
}
