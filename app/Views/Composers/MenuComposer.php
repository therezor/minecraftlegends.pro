<?php

namespace App\Views\Composers;

use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use Illuminate\View\View;

class MenuComposer
{
    protected CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function compose(View $view)
    {
        $categories = $this->categoryRepository->pushCriteria(new OrderByCriteria('display_order', 'asc'))
            ->get();

        $view->with('categories', $categories);
    }
}
