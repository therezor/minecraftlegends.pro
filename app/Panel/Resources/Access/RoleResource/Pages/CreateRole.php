<?php

namespace App\Panel\Resources\Access\RoleResource\Pages;

use App\Panel\Resources\Access\RoleResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateRole extends CreateRecord
{
    protected static string $resource = RoleResource::class;
}
