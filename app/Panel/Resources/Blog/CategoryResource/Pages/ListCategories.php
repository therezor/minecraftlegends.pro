<?php

namespace App\Panel\Resources\Blog\CategoryResource\Pages;

use App\Panel\Resources\Blog\CategoryResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCategories extends ListRecords
{
    protected static string $resource = CategoryResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}