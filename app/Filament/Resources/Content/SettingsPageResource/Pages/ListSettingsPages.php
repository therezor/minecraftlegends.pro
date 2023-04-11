<?php

namespace App\Filament\Resources\Content\SettingsPageResource\Pages;

use App\Filament\Resources\SettingsPageResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSettingsPages extends ListRecords
{
    protected static string $resource = SettingsPageResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
