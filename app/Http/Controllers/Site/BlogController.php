<?php

namespace App\Http\Controllers\Site;

use App\Eloquent\Models\Post;
use App\Eloquent\Models\Site\Site;
use App\Eloquent\Repositories\Criteria\BelongsToSiteCriteria;
use App\Eloquent\Repositories\Site\Blog\PostRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    protected PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function index(Request $request)
    {
        /** @var Site $site */
        $site = $request->get('current_site');
        $posts = $this->postRepository->pushCriteria(new BelongsToSiteCriteria($site))->simplePaginate(12);

        $this->seo()->setTitle($post->og_title ?? $site->title, false);
        $this->seo()->setDescription($post->og_description ?? $site->title);
        $this->seo()->setCanonical(route('site.blog.index'));

        return view('site.blog.index', [
            'posts' => $posts,
        ]);
    }

    public function show(Request $request, string $slug)
    {
        /** @var Site $site */
        $site = $request->get('current_site');
        /** @var Post $post */
        $post = $this->postRepository->pushCriteria(new BelongsToSiteCriteria($site))->findByOrFail('slug', $slug);

        $this->seo()->setTitle($post->og_title ?? $post->title, false);
        $this->seo()->setDescription($post->og_description ?? $post->title);
        $this->seo()->opengraph()->setType('article');
        $this->seo()->opengraph()->setArticle([
            'published_time' => $post->created_at,
            'modified_time' => $post->updated_at,
            'author' => $site->name,
        ]);
        if ($post->image_id || $post->og_image_id) {
            $this->seo()->addImages(imageUrl($post->og_image_id ?? $post->image_id));
        }
        $this->seo()->setCanonical(route('site.blog.show', $slug));

        return view('site.blog.show', [
            'post' => $post,
        ]);
    }
}
