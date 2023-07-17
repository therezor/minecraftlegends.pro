<?php

namespace App\Panel\Resources\Traits;

use App\Models\Path;
use Filament\Forms;
use Wiebenieuwenhuis\FilamentCharCounter\Textarea;
use Wiebenieuwenhuis\FilamentCharCounter\TextInput;

trait HasPath
{
    protected static function formPathSection(): Forms\Components\Card
    {
        return Forms\Components\Card::make()
            ->relationship('path')
            ->schema([
                Forms\Components\TextInput::make('slug')
                    ->label(__('attributes.slug'))
                    ->required()
                    ->regex('/^\/$|^[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*$/')
                    ->maxLength(255)
                    ->unique(Path::class, 'slug', ignoreRecord: true)
                    ->dehydrateStateUsing(fn ($state) => (string)$state),

                Forms\Components\FileUpload::make('meta_image')
                    ->label(__('attributes.meta_image'))
                    ->disk('public')
                    ->image()
                    ->imageResizeMode('cover')
                    ->imageCropAspectRatio('1.91:1')
                    ->imageResizeTargetWidth('1200')
                    ->imageResizeTargetHeight('630')
                    ->imageResizeUpscale(false),

                Forms\Components\TextInput::make('meta_title')
                    ->label(__('attributes.meta_title'))
                    ->maxLength(255),

                Forms\Components\Textarea::make('meta_description')
                    ->rows(2)
                    ->label(__('attributes.meta_description'))
                    ->maxLength(255),
            ]);
    }
}
