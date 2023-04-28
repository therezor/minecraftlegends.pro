<?php

namespace App\Providers;

use App\Settings\SiteSettings;
use App\Views\Composers\MenuComposer;
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
        $this->registerSiteSettings();

        Paginator::useBootstrapFive();

        View::composer('sections.menu', MenuComposer::class);
    }

    protected function registerSiteSettings()
    {
        /** @var SiteSettings $settings */
        $settings = $this->app->make(SiteSettings::class);

        config()->set('app.name', $settings->name);
        config()->set('app.locale', $settings->locale);
    }
}
