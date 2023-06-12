<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Page;

class PageController extends Controller
{
    public function show(Page $page)
    {
        $this->seo()->setTitle($page->name);
        // render blocks
        return view('page', ['page' => $page]);
    }
}
