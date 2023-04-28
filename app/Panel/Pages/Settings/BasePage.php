<?php

namespace App\Panel\Pages\Settings;

use App\Enums\Access\Role\Permission;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Pages\Actions\Action;
use Filament\Pages\Page;
use Filament\Pages\Concerns;
use Filament\Pages\Contracts\HasFormActions;
use Illuminate\Support\Facades\Artisan;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

abstract class BasePage extends Page implements HasFormActions
{
    use Concerns\HasFormActions;

    protected static string $view = 'panel.pages.settings';
    protected static array $envKeys = [
    ];

    protected abstract static function getPermission(): Permission;

    protected static function getNavigationGroup(): ?string
    {
        return __('panel.settings.title');
    }

    protected function getTitle(): string
    {
        return static::getNavigationLabel();
    }

    protected function getFormSchema(): array
    {
        return [];
    }

    protected static function shouldRegisterNavigation(): bool
    {
        return auth()->user()->can(static::getPermission()->value);
    }

    public $data;

    public function mount(): void
    {
        abort_unless(auth()->user()->can(static::getPermission()->value), 403);

        $this->fillForm();
    }

    protected function fillForm(): void
    {
        $this->callHook('beforeFill');

        $data = collect(DotenvEditor::getKeys(static::$envKeys))->map(fn($item) => $item['value'])->toArray();

        $this->form->fill($data);

        $this->callHook('afterFill');
    }

    public function save(): void
    {
        $this->callHook('beforeValidate');

        $data = $this->form->getState();

        $this->callHook('afterValidate');

        $this->callHook('beforeSave');

        DotenvEditor::setKeys($data);
        DotenvEditor::save();
        Artisan::call('config:cache');

        $this->callHook('afterSave');

        $this->getSavedNotification()?->send();
    }

    protected function getSavedNotification(): ?Notification
    {
        $title = $this->getSavedNotificationTitle();

        if (blank($title)) {
            return null;
        }

        return Notification::make()
            ->success()
            ->title($title);
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return __('filament::resources/pages/edit-record.messages.saved');
    }

    protected function callHook(string $hook): void
    {
        if (!method_exists($this, $hook)) {
            return;
        }

        $this->{$hook}();
    }

    protected function getFormActions(): array
    {
        return [
            $this->getSaveFormAction(),
        ];
    }

    protected function getSaveFormAction(): Action
    {
        return Action::make('save')
            ->label(__('filament::resources/pages/edit-record.form.actions.save.label'))
            ->submit('save')
            ->keyBindings(['mod+s']);
    }

    protected function getForms(): array
    {
        return [
            'form' => $this->makeForm()
                ->schema($this->getFormSchema())
                ->statePath('data')
                ->columns(3)
                ->inlineLabel(config('filament.layout.forms.have_inline_labels')),
        ];
    }

    protected function getBreadcrumbs(): array
    {
        return [
            static::getUrl() => static::getNavigationGroup(),
            static::getNavigationLabel(),
        ];
    }
}
