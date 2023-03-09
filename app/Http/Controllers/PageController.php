<?php

namespace App\Http\Controllers;

use Illuminate\Support\HtmlString;

class PageController extends Controller
{
    public function terms()
    {
        $title = trans('pages.terms.title');
        $description = trans('pages.terms.description', ['app_name' => config('app.name')]);
        $content = new HtmlString(
            trans('pages.terms.content', [
                'app_name' => config('app.name'),
                'privacy_url' => route('pages.privacy'),
            ])
        );

        $this->seo()->setTitle($title);
        $this->seo()->setDescription($description);

        return view('page', ['title' => $title, 'content' => $content]);
    }

    public function privacy()
    {
        $title = trans('pages.privacy.title');
        $description = trans('pages.privacy.description');
        $content = new HtmlString(trans('pages.privacy.content', ['app_name' => config('app.name')]));

        $this->seo()->setTitle($title);
        $this->seo()->setDescription($description);

        return view('page', ['title' => $title, 'content' => $content]);
    }

    public function cookies()
    {
        $title = trans('pages.cookies.title');
        $description = trans('pages.cookies.description');
        $content = new HtmlString(trans('pages.cookies.content', ['app_name' => config('app.name')]));

        $this->seo()->setTitle($title);
        $this->seo()->setDescription($description);

        return view('page', ['title' => $title, 'content' => $content]);
    }

    public function test()
    {
        return view('test');
    }

    public function testPost()
    {
        return view('test-post');
    }
}
