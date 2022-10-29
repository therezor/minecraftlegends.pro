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

        return view('pages.show', ['page' => $page]);
    }
}
