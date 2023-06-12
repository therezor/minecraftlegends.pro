<?php

namespace App\Http\Controllers;

use App\Models\Path;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PathController extends Controller
{
    public function __invoke(Path $path, Request $request)
    {
        $entityClass = get_class($path->entity);
        $controllerClass = Str::replace('App\\Models\\', 'App\\Http\\Controllers\\', $entityClass) . 'Controller';
        abort_if(!class_exists($controllerClass), 404);

        $response = app()->make($controllerClass)->show($path->entity);
        $this->setPathSeo($path, $request);

        return $response;
    }

    protected function setPathSeo(Path $path, Request $request)
    {
        if ($path->meta_title) {
            $this->seo()->setTitle($path->meta_title, false);
        }
        if ($path->meta_description) {
            $this->seo()->setDescription($path->meta_description);
        }
        if ($path->meta_image) {
            $this->seo()->addImages(Storage::disk('public')->url($path->meta_image));
        }

        $host = rtrim(config('app.url'), '\\');
        $url = route('path', $path->slug, false);
        $currentPage = (int)$request->query('page');
        $params = $currentPage > 1
            ? '?page=' . $currentPage
            : '';
        $this->seo()->setCanonical($host . $url . $params);
    }
}
