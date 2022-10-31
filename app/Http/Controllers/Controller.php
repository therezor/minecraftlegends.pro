<?php

namespace App\Http\Controllers;

use Artesaos\SEOTools\SEOTools;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;

    protected function seo(): SEOTools
    {
        return app('seotools');
    }

    protected function setRobots(string $robots): void
    {
        app('seotools.metatags')->setRobots($robots);
    }
}
