<?php

namespace App\Panel\Resources\Blog\CategoryResource\Pages;

use App\Panel\Resources\Blog\CategoryResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCategory extends CreateRecord
{
    protected static string $resource = CategoryResource::class;
}
