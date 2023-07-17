<?php

namespace App\Panel\Pages\Settings;

use App\Enums\Access\Role\Permission;
use Filament\Forms;
use Guava\FilamentIconPicker\Forms\IconPicker;
use Illuminate\Support\Arr;

class Appearance extends BasePage
{
    protected static ?string $navigationIcon = 'heroicon-o-color-swatch';
    protected static ?string $slug = 'settings/appearance';
    protected static array $envKeys = [
        'logo',
        'favicon',
        'copyright',
        'footer_text',
        'social_icons',
    ];
    protected static ?int $navigationSort = 101;

    protected static function getNavigationLabel(): string
    {
        return __('panel.settings.appearance.title');
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
                    Forms\Components\FileUpload::make('logo')
                        ->label(__('attributes.logo'))
                        ->disk('public')
                        ->image()
                        ->columnSpan(['lg' => 1]),

                    Forms\Components\FileUpload::make('favicon')
                        ->label(__('attributes.favicon'))
                        ->disk('public')
                        ->image()
                        ->columnSpan(['lg' => 1]),

                    Forms\Components\TextInput::make('copyright')
                        ->label(__('attributes.copyright'))
                        ->required()
                        ->columnSpan(['lg' => 2]),

                    Forms\Components\Textarea::make('footer_text')
                        ->label(__('attributes.footer_text'))
                        ->required()
                        ->columnSpan(['lg' => 2]),

                    Forms\Components\Repeater::make('social_icons')
                        ->label(__('attributes.social_icons'))
                        ->columnSpan(['lg' => 2])
                        ->schema([
                            IconPicker::make('icon')
                                ->label(__('attributes.icon'))
                                ->required(),
                            Forms\Components\TextInput::make('url')
                                ->label(__('attributes.url'))
                                ->required()
                                ->url(),
                        ]),
                ]),
        ];
    }

    protected function fillForm(): void
    {
        $this->callHook('beforeFill');

        $data = [];
        foreach (static::$envKeys as $key) {
            $data[$key] = setting()->get($key);
        }

        $this->form->fill($data);

        $this->callHook('afterFill');
    }

    public function save(): void
    {
        $this->callHook('beforeValidate');

        $data = $this->form->getState();

        $this->callHook('afterValidate');

        $this->callHook('beforeSave');

        setting(Arr::only($data, static::$envKeys))->save();

        $this->callHook('afterSave');

        $this->getSavedNotification()?->send();
    }
}
