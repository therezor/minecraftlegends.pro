<?php

namespace App\Panel\Resources\Content\LayoutResource\Pages;

use App\Panel\Resources\Content\LayoutResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLayout extends EditRecord
{
    protected static string $resource = LayoutResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
