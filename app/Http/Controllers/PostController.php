<?php

namespace App\Http\Controllers;

use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\PostRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function show($slug)
    {
        /** @var Post $post */
        $post = $this->postRepository->findByOrFail('slug', $slug);

        $blocks = $this->paginateBlocks($post);
        $votePoints = (int) $post->votes()->sum('post_votes.points');
        $vote = auth()->id()
            ? $post->votes()->where('user_id', auth()->id())->first()?->getRelationValue('pivot')
            : null;

        $this->seo()->setTitle($post->title, false);
        $this->seo()->setDescription($post->description);
        $this->seo()->opengraph()->setType('article');
        $this->seo()->opengraph()->setArticle([
            'published_time' => $post->created_at,
            'modified_time' => $post->updated_at,
            'author' => $post->author->name,
        ]);
        if ($post->og_title) {
            $this->seo()->opengraph()->setTitle($post->og_title);
            $this->seo()->twitter()->setTitle($post->og_title);
        }
        if ($post->og_description) {
            $this->seo()->opengraph()->setDescription($post->og_description);
            $this->seo()->twitter()->setDescription($post->og_description);
        }
        if ($post->image_id || $post->og_image_id) {
            $this->seo()->addImages(imageUrl($post->og_image_id ?? $post->image_id));
        }
        $this->seo()->setCanonical(route('posts.show', $slug));

        return view('posts.show', [
            'post' => $post,
            'blocks' => $blocks,
            'vote' => $vote,
            'votePoints' => $votePoints,
        ]);
    }

    public function vote($id, Request $request)
    {
        /** @var Post $post */
        $post = $this->postRepository->findOrFail($id);

        $points = (int) $request->input('points');
        $points = ($points === 1) ? $points : -1;
        $this->postRepository->vote($post, auth()->user(), $points);

        return redirect()->back();
    }

    protected function paginateBlocks(Post $post): Collection | LengthAwarePaginator
    {
        if ($post->per_page) {
            $blocks = $post->blocks()->paginate($post->per_page);
            abort_if($blocks->currentPage() < 1 || $blocks->currentPage() > $blocks->lastPage(), 404);

            return $blocks;
        }

        return $post->blocks;
    }
}
