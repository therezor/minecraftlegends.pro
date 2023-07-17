<?php

namespace App\Providers;

use App\Models\Blog\Category;
use App\Models\Blog\Post;
use App\Models\Content\Page;
use App\Views\Composers\MenuComposer;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrapFive();

        Relation::enforceMorphMap([
            'pages' => Page::class,
            'blog_categories' => Category::class,
            'blog_posts' => Post::class,
        ]);
    }
}
