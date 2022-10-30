<?php

namespace App\Providers;

use App\Views\Composers\HeaderComposer;
use App\Views\Composers\SidebarComposer;
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

        View::composer('sections.header', HeaderComposer::class);
        View::composer('sections.sidebar', SidebarComposer::class);
    }
}
