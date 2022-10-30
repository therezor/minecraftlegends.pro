<?php

namespace App\Views\Composers;

use App\Eloquent\Repositories\Criteria\LimitCriteria;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\Posts\FeaturedCriteria;
use App\Eloquent\Repositories\Criteria\Posts\PublishedCriteria;
use App\Eloquent\Repositories\PostRepository;
use App\Enums\Post\Featured;
use Illuminate\View\View;

class SidebarComposer
{
    protected PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function compose(View $view)
    {
        $featured = $this->postRepository
            ->pushCriteria(new FeaturedCriteria(Featured::FEATURED))
            ->pushCriteria(new OrderByCriteria('id'))
            ->pushCriteria(new PublishedCriteria())
            ->pushCriteria(new LimitCriteria(3))
            ->get();

        $editorChoice = $this->postRepository->popCriteria(FeaturedCriteria::class)
            ->pushCriteria(new FeaturedCriteria(Featured::EDITOR_CHOICE))
            ->get();

        $view->with('featured', $featured)
            ->with('editorChoice', $editorChoice);
    }
}
