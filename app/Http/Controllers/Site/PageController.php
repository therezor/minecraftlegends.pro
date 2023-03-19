<?php

namespace App\Http\Controllers\Site;

use App\Eloquent\Models\Site\Page;
use App\Eloquent\Models\Site\Site;
use App\Eloquent\Repositories\Criteria\BelongsToSiteCriteria;
use App\Eloquent\Repositories\Site\PageRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PageController extends Controller
{
    protected PageRepository $pageRepository;

    public function __construct(PageRepository $pageRepository)
    {
        $this->pageRepository = $pageRepository;
    }

    public function show(Request $request, string $slug)
    {
        /** @var Site $site */
        $site = $request->get('current_site');
        /** @var Page $page */
        $page = $this->pageRepository->pushCriteria(new BelongsToSiteCriteria($site))->findByOrFail('slug', $slug);

        $this->seo()->setTitle($page->meta_title ?? $page->name, false);
        $this->seo()->setDescription($page->meta_description);
        if ($page->meta_image_id) {
            $this->seo()->addImages(imageUrl($page->meta_image_id));
        }
        $this->seo()->setCanonical(route('site.index', $slug));

        return view('site.page', ['site' => $site, 'page' => $page]);
    }
}
