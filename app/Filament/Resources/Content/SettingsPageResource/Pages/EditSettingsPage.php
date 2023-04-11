<?php

namespace App\Filament\Resources\Content\SettingsPageResource\Pages;

use App\Filament\Resources\SettingsPageResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSettingsPage extends EditRecord
{
    protected static string $resource = SettingsPageResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
