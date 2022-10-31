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

        $this->seo()->setTitle(__('Guides, mods, hacks, tips form Minecraft legends'), false);
        $this->seo()->setDescription(__('Welcome to MinecraftLegends fan site. Here you can track the latest news and modifications, download mods,  share the experience with others, and give helpful advice to new users.'));
        $this->seo()->setCanonical(route('index'));

        return view('index', ['posts' => $posts]);
    }

    public function search(Request $request)
    {
        $term = $request->get('term');

        $posts = $this->postRepository->pushCriteria(new SearchCriteria($term))
            ->pushCriteria(new OrderByCriteria('id'))
            ->paginate(20);

        $this->seo()->setTitle(__('Search'));
        $this->setRobots('none');

        return view('search', ['posts' => $posts, 'term' => $term]);
    }
}
