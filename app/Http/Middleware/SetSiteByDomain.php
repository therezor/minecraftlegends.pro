<?php

namespace App\Http\Middleware;

use App\Eloquent\Repositories\Site\SiteRepository;
use Closure;
use Illuminate\Http\Request;

class SetSiteByDomain
{
    protected SiteRepository $repository;

    public function __construct(SiteRepository $repository)
    {
        $this->repository = $repository;
    }
    public function handle(Request $request, Closure $next)
    {
        $domain = $request->host();

        $site = $this->repository->findByOrFail('domain', $domain);
        $request->merge(['current_site' => $site]);
        config()->set('app.url', $request->getScheme() . '://' . $site->domain);
        config()->set('app.name', $site->name);

        return $next($request);
    }
}
