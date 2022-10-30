<?php

namespace App\Http\Controllers;

use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\Posts\PublishedCriteria;
use App\Eloquent\Repositories\Criteria\Posts\SearchCriteria;
use App\Eloquent\Repositories\PostRepository;
use Illuminate\Http\Request;

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

    public function search(Request $request)
    {
        $term = $request->get('term');

        $posts = $this->postRepository->pushCriteria(new SearchCriteria($term))
            ->pushCriteria(new OrderByCriteria('id'))
            ->paginate(20);

        return view('search', ['posts' => $posts, 'term' => $term]);
    }
}
