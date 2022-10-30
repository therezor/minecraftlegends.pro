<?php

namespace App\Http\Controllers;

use App\Eloquent\Repositories\PageRepository;

class PageController extends Controller
{
    protected PageRepository $pageRepository;

    public function __construct(PageRepository $pageRepository)
    {
        $this->pageRepository = $pageRepository;
    }

    public function show($slug)
    {
        $page = $this->pageRepository->findByOrFail('slug', $slug);

        $this->seo()->setTitle($page->title, false);
        $this->seo()->setDescription($page->description);
        $this->seo()->opengraph()->setTitle($page->og_title);
        $this->seo()->opengraph()->setDescription($page->og_description);
        $this->seo()->setCanonical(route('pages.show', $slug));

        return view('pages.show', ['page' => $page]);
    }
}
