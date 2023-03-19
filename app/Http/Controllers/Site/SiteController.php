<?php

namespace App\Http\Controllers\Site;

use App\Eloquent\Models\Site\Page;
use App\Eloquent\Models\Site\Site;
use App\Eloquent\Repositories\Criteria\BelongsToSiteCriteria;
use App\Eloquent\Repositories\Site\Blog\PostRepository;
use App\Eloquent\Repositories\Site\PageRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    protected PageRepository $pageRepository;

    public function __construct(PageRepository $pageRepository)
    {
        $this->pageRepository = $pageRepository;
    }

    public function index(Request $request)
    {
        /** @var Site $site */
        $site = $request->get('current_site');
        /** @var Page $page */
        $page = $this->pageRepository->pushCriteria(new BelongsToSiteCriteria($site))->findByOrFail('slug', '/');

        $this->seo()->setTitle($page->meta_title ?? $site->name, false);
        $this->seo()->setDescription($page->meta_description ?? null);
        if ($page->meta_image_id) {
            $this->seo()->addImages(imageUrl($page->meta_image_id));
        }
        $this->seo()->setCanonical(route('site.index'));

        $posts = app(PostRepository::class)->pushCriteria(new BelongsToSiteCriteria($site))->get();

        return view('site.index', ['site' => $site, 'page' => $page, 'posts' => $posts]);
    }
}
