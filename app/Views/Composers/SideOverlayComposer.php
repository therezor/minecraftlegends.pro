<?php

namespace App\Views\Composers;

use App\Eloquent\Models\User;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\OwnedByUserCriteria;
use App\Eloquent\Repositories\Site\SiteRepository;
use Illuminate\View\View;

class SideOverlayComposer
{
    protected SiteRepository $repository;

    public function __construct(SiteRepository $repository)
    {
        $this->repository = $repository;
    }

    public function compose(View $view)
    {
        /** @var User $user */
        $user = auth()->user();

        $sites = $this->repository->pushCriteria(new OwnedByUserCriteria($user))
            ->pushCriteria(new OrderByCriteria('id', 'asc'))
            ->get();

        $view->with('sites', $sites);
    }
}
