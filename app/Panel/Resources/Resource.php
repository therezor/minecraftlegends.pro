<?php

namespace App\Panel\Resources;

use App\Panel\Resources\Traits\HasPermission;
use Filament\Resources\Resource as BaseResource;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Closure;

abstract class Resource extends BaseResource
{
    use HasPermission;

    public static function getRouteBaseName(): string
    {
        $routeName = static::getRouteName();

        return "filament.resources.{$routeName}";
    }

    public static function getRoutes(): Closure
    {
        return function () {
            $slug = static::getSlug();

            $routeName = static::getRouteName();

            Route::name("{$routeName}.")
                ->prefix($slug)
                ->middleware(static::getMiddlewares())
                ->group(function () {
                    foreach (static::getPages() as $name => $page) {
                        Route::get($page['route'], $page['class'])->name($name);
                    }
                });
        };
    }

    protected static function getRouteName(): string
    {
        return Str::replace('/', '.', static::getSlug());
    }
}
