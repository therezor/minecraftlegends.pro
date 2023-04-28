<?php

namespace App\Providers;

use CmsMulti\FilamentClearCache\Facades\FilamentClearCache;
use Filament\Facades\Filament;
use Filament\Navigation\NavigationGroup;
use Illuminate\Support\ServiceProvider;

class FilamentServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Filament::registerTheme(asset('css/panel.css'));

        FilamentClearCache::addCommand('page-cache:clear');

        Filament::registerNavigationGroups([
            NavigationGroup::make()
                ->label(__('panel.settings.title'))
                ->collapsed(),
        ]);
    }
}
