<?php

namespace App\Filament\Pages;

use App\Settings\SettingName;
use Filament\Pages\SettingsPage;

class ManageFooter extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog';

    protected static string $settings = SettingName::class;

    protected function getFormSchema(): array
    {
        return [
            // ...
        ];
    }
}
