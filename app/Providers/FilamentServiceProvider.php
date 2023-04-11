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
        Filament::registerTheme(mix('css/panel.css'));

        FilamentClearCache::addCommand('page-cache:clear');

        Filament::registerNavigationGroups([
            NavigationGroup::make()
                ->label(__('panel.blog.title')),
            NavigationGroup::make()
                ->label(__('panel.section.content')),
            NavigationGroup::make()
                ->label(__('panel.access.title')),
            NavigationGroup::make()
                ->label('Settings')
                ->icon('heroicon-s-cog')
                ->collapsed(),
        ]);
    }
}
