<?php

namespace App\Providers;

use App\Views\Composers\MenuComposer;
use App\Views\Composers\PanelLayoutComposer;
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

        View::composer('sections.menu', MenuComposer::class);
        View::composer('layouts.panel', PanelLayoutComposer::class);
    }
}
