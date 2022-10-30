<?php

namespace App\Http\Controllers;

use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\PostRepository;
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
        $post = $this->postRepository->findByOrFail('slug', $slug);

        $blocks = $this->paginateBlocks($post);
        $votePoints = (int) $post->votes()->sum('post_votes.points');
        $vote = auth()->id()
            ? $post->votes()->where('user_id', auth()->id())->first()?->pivot
            : null;

        return view('posts.show', [
            'post' => $post,
            'blocks' => $blocks,
            'vote' => $vote,
            'votePoints' => $votePoints,
        ]);
    }

    public function vote($id, Request $request)
    {
        $post = $this->postRepository->findOrFail($id);

        $points = (int) $request->input('points');
        $points = ($points === 1) ? $points : -1;
        $this->postRepository->vote($post, auth()->user(), $points);

        return redirect()->back();
    }

    protected function paginateBlocks(Post $post)
    {
        if ($post->per_page) {
            $blocks = $post->blocks()->paginate($post->per_page);
            abort_if($blocks->currentPage() < 1 || $blocks->currentPage() > $blocks->lastPage(), 404);

            return $blocks;
        }

        return $post->blocks;
    }
}
