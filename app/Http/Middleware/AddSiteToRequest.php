<?php

namespace App\Http\Middleware;

use App\Eloquent\Models\User;
use App\Eloquent\Repositories\Criteria\OwnedByUserCriteria;
use App\Eloquent\Repositories\Site\SiteRepository;
use Closure;
use Illuminate\Http\Request;

class AddSiteToRequest
{
    protected SiteRepository $repository;

    public function __construct(SiteRepository $repository)
    {
        $this->repository = $repository;
    }
    public function handle(Request $request, Closure $next)
    {
        /** @var User $user */
        $user = auth()->user();
        $hostname = $request->route('panel');

        $site = $this->repository->pushCriteria(new OwnedByUserCriteria($user))
            ->findByOrFail('hostname', $hostname);
        $request->merge(['current_site' => $site]);

        return $next($request);
    }
}
