<?php

namespace App\Views\Composers;

use App\Models\Content\Page;
use Illuminate\View\View;

class FooterComposer
{
    public function compose(View $view)
    {
        $pages = Page::where('show_in_footer', true)->orderBy('display_order')->get();

        $view->with('pages', $pages);
    }
}
