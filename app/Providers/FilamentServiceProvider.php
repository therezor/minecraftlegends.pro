<?php

namespace App\Providers;

use CmsMulti\FilamentClearCache\Facades\FilamentClearCache;
use Filament\Facades\Filament;
use Illuminate\Support\ServiceProvider;

class FilamentServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Filament::registerTheme(mix('css/panel.css'));

        FilamentClearCache::addCommand('page-cache:clear');
    }
}
