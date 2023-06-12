<?php

namespace App\Providers;

use CmsMulti\FilamentClearCache\Facades\FilamentClearCache;
use Filament\Facades\Filament;
use Filament\Navigation\NavigationGroup;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class FilamentServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Filament::registerTheme(Vite::asset('resources/sass/panel.scss', 'panel'));

        FilamentClearCache::addCommand('page-cache:clear');

        Filament::registerNavigationGroups([
            NavigationGroup::make()
                ->label(__('panel.settings.title'))
                ->collapsed(),
        ]);
    }
}
