<?php

namespace App\Panel\Resources\Traits;

use Filament\Forms;
use Wiebenieuwenhuis\FilamentCharCounter\Textarea;
use Wiebenieuwenhuis\FilamentCharCounter\TextInput;

trait HasSeo
{
    protected static function formSeoSection(): Forms\Components\Card
    {
        return Forms\Components\Card::make()
            ->schema([
                Forms\Components\FileUpload::make('meta_image')
                    ->label(__('attributes.meta_image'))
                    ->disk('public')
                    ->image()
                    ->imageResizeMode('cover')
                    ->imageCropAspectRatio('1.91:1')
                    ->imageResizeTargetWidth('1200')
                    ->imageResizeTargetHeight('630')
                    ->imageResizeUpscale(false),

                TextInput::make('meta_title')
                    ->label(__('attributes.meta_title'))
                    ->maxLength(255),

                Textarea::make('meta_description')
                    ->rows(2)
                    ->label(__('attributes.meta_description'))
                    ->maxLength(255),
            ]);
    }
}
