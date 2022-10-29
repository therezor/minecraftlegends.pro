<?php

namespace App\Http\Controllers;

use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\PostRepository;

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

        return view('posts.show', ['post' => $post, 'blocks' => $blocks]);
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
