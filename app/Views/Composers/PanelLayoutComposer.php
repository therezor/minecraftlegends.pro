<?php

namespace App\Views\Composers;

use App\Eloquent\Models\Site\Site;
use App\Eloquent\Models\User;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\OwnedByUserCriteria;
use App\Eloquent\Repositories\Site\SiteRepository;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PanelLayoutComposer
{
    protected SiteRepository $repository;
    protected Request $request;

    public function __construct(SiteRepository $repository, Request $request)
    {
        $this->repository = $repository;
        $this->request = $request;
    }

    public function compose(View $view)
    {
        /** @var User $user */
        $user = auth()->user();

        /** @var Site $site */
        $site = $this->request->get('current_site');

        $sites = $this->repository->pushCriteria(new OwnedByUserCriteria($user))
            ->pushCriteria(new OrderByCriteria('id', 'asc'))
            ->get();

        $view->with([
            'site' => $site,
            'sites' => $sites,
        ]);
    }
}
