<?php

namespace App\Panel\Resources\Blog\PostResource\Pages;

use App\Panel\Resources\Blog\PostResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePost extends CreateRecord
{
    protected static string $resource = PostResource::class;
}
