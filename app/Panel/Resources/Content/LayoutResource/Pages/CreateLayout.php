<?php

namespace App\Panel\Resources\Content\LayoutResource\Pages;

use App\Panel\Resources\Content\LayoutResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateLayout extends CreateRecord
{
    protected static string $resource = LayoutResource::class;
}
