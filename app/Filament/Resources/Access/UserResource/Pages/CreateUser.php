<?php

namespace App\Filament\Resources\Access\UserResource\Pages;

use App\Filament\Resources\Access\UserResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;
}
