<?php

namespace App\Filament\Resources\Content;

use App\Eloquent\Models\Page;
use App\Filament\Resources\Content;
use App\Filament\Resources\PageResource\Pages;
use App\Filament\Resources\PageResource\RelationManagers;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;
    protected static ?string $slug = 'content/pages';
    protected static ?string $recordTitleAttribute = 'title';
    protected static ?string $navigationGroup = 'Content';
    protected static ?string $navigationIcon = 'heroicon-o-bookmark-alt';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Content\PageResource\Pages\ListPages::route('/'),
            'create' => Content\PageResource\Pages\CreatePage::route('/create'),
            'edit' => Content\PageResource\Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
