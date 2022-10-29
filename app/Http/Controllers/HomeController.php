<?php

namespace App\Http\Controllers;

use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\Posts\PublishedCriteria;
use App\Eloquent\Repositories\PostRepository;

class HomeController extends Controller
{
    protected PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function index()
    {
        $posts = $this->postRepository->pushCriteria(new PublishedCriteria())
            ->pushCriteria(new OrderByCriteria('id'))
            ->paginate(20);

        return view('index', ['posts' => $posts]);
    }
}
