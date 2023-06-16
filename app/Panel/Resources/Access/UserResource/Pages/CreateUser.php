<?php

namespace App\Panel\Resources\Access\UserResource\Pages;

use App\Panel\Resources\Access\UserResource;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;
}
