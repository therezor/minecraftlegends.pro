<?php

namespace App\Panel\Pages\Settings;

use App\Enums\Access\Role\Permission;
use Filament\Forms;

class General extends BasePage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog';
    protected static ?string $slug = 'settings/general';
    protected static array $envKeys = [
        'APP_NAME',
        'APP_URL',
        'APP_LOGO',
        'APP_FAVICON',
        'APP_LOCALE',
    ];
    protected static ?int $navigationSort = 100;

    protected static function getNavigationLabel(): string
    {
        return __('panel.settings.general.title');
    }

    protected static function getPermission(): Permission
    {
        return Permission::PANEL_SETTINGS_GENERAL;
    }

    protected function getFormSchema(): array
    {
        return [
            Forms\Components\Card::make()
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('APP_NAME')
                        ->label(__('attributes.name'))
                        ->required()
                        ->columnSpan(['lg' => 2]),

                    Forms\Components\TextInput::make('APP_URL')
                        ->label(__('attributes.url'))
                        ->required()
                        ->rule('url')
                        ->columnSpan(['lg' => 2]),

                    Forms\Components\FileUpload::make('APP_LOGO')
                        ->label(__('attributes.logo'))
                        ->disk('public')
                        ->image()
                        ->columnSpan(['lg' => 1]),

                    Forms\Components\FileUpload::make('APP_FAVICON')
                        ->label(__('attributes.favicon'))
                        ->disk('public')
                        ->image()
                        ->columnSpan(['lg' => 1]),

                    Forms\Components\Select::make('APP_LOCALE')
                        ->label(__('attributes.locale'))
                        ->options([
                            'en' => __('panel.settings.general.locales.en'),
                        ])
                        ->required()
                        ->columnSpan(['lg' => 2]),
                ]),
        ];
    }
}
