<?php

namespace App\Http\Controllers;

use App\Eloquent\Repositories\Criteria\Posts\PublishedCriteria;
use App\Eloquent\Repositories\PageRepository;
use App\Eloquent\Repositories\PostRepository;
use App\Enums\Block\Type;
use Watson\Sitemap\Sitemap;

class SitemapController extends Controller
{
    protected PageRepository $pageRepository;
    protected PostRepository $postRepository;

    public function __construct(PageRepository $pageRepository, PostRepository $postRepository)
    {
        $this->pageRepository = $pageRepository;
        $this->postRepository = $postRepository;
    }

    public function index(Sitemap $sitemap)
    {
        $posts = $this->postRepository->pushCriteria(new PublishedCriteria())->cursor();
        $pages = $this->pageRepository->cursor();

        if ($sitemap->hasCachedView()) {
            return $sitemap->render();
        }

        $sitemap->addTag(route('index'), null, 'daily', '1');
        foreach ($posts as $post) {
            $tag = $sitemap->addTag(route('posts.show', $post->slug), $post->updated_at, 'daily', '0.8');

            if ($post->image_id) {
                $tag->addImage(imageUrl($post->image_id), $post->title);
            }

            foreach ($post->blocks()->where('type', Type::IMAGE->value)->cursor() as $block) {
                if ($block->image_id) {
                    $tag->addImage(imageUrl($block->image_id), $block->data['alt'] ?? $block->title ?? $post->title);
                }
            }
        }
        foreach ($pages as $page) {
            $sitemap->addTag(route('pages.show', $page->slug), $page->updated_at, 'daily', '0.7');
        }

        return $sitemap->render();
    }
}
