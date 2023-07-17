<?php

namespace App\Panel\Pages\Settings;

use App\Enums\Access\Role\Permission;
use Filament\Forms;

class Mailer extends BasePage
{
    protected static ?string $navigationIcon = 'heroicon-o-mail';
    protected static ?string $slug = 'settings/mailer';
    protected static array $envKeys = [
        'MAIL_HOST',
        'MAIL_PORT',
        'MAIL_USERNAME',
        'MAIL_PASSWORD',
        'MAIL_FROM_ADDRESS',
        'MAIL_FROM_NAME',
    ];

    protected static ?int $navigationSort = 102;

    protected static function getNavigationLabel(): string
    {
        return __('panel.settings.mailer.title');
    }

    protected static function getPermission(): Permission
    {
        return Permission::PANEL_SETTINGS_MAILER;
    }

    protected function getFormSchema(): array
    {
        return [
            Forms\Components\Card::make()
                ->columns(2)
                ->schema([
                    Forms\Components\TextInput::make('MAIL_HOST')
                        ->label(__('attributes.host'))
                        ->required()
                        ->string(),

                    Forms\Components\TextInput::make('MAIL_PORT')
                        ->label(__('attributes.port'))
                        ->required()
                        ->integer(),

                    Forms\Components\TextInput::make('MAIL_USERNAME')
                        ->label(__('attributes.username'))
                        ->required()
                        ->string(),

                    Forms\Components\TextInput::make('MAIL_PASSWORD')
                        ->label(__('attributes.password'))
                        ->required()
                        ->password(),

                    Forms\Components\TextInput::make('MAIL_FROM_ADDRESS')
                        ->label(__('attributes.from_address'))
                        ->required()
                        ->email(),

                    Forms\Components\TextInput::make('MAIL_FROM_NAME')
                        ->label(__('attributes.from_name'))
                        ->required()
                        ->string()
                        ->maxLength(255),
                ]),
        ];
    }
}
