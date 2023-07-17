<?php

namespace App\Panel\Resources\Blog;

use App\Enums\Access\Role\Permission;
use App\Models\Blog\Category;
use App\Panel\Resources\Blog\CategoryResource\Pages;
use Filament\Forms;
use Filament\Resources\Form;
use App\Panel\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;
    protected static ?string $slug = 'blog/categories';
    protected static ?string $recordTitleAttribute = 'name';
    protected static ?string $navigationIcon = 'heroicon-o-collection';
    protected static ?int $navigationSort = 2;

    protected static function getNavigationGroup(): ?string
    {
        return __('panel.blog.title');
    }

    protected static function getPermission(): Permission
    {
        return Permission::PANEL_BlOG_CATEGORIES;
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name'];
    }

    public static function form(Form $form): Form
    {
        return $form
            ->columns(3)
            ->schema([
                Forms\Components\Card::make()
                    ->columnSpan(['lg' => 2])
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label(__('attributes.name'))
                            ->required()
                            ->unique(Category::class, 'name', ignoreRecord: true)
                            ->maxLength(255)
                            ->columnSpan('full'),

                        Forms\Components\TextInput::make('display_order')
                            ->label(__('attributes.display_order'))
                            ->numeric()
                            ->minValue(0)
                            ->default((int)Category::max('display_order') + 1),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('display_order')
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('attributes.name'))
                    ->limit()
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('display_order')
                    ->label(__('attributes.display_order'))
                    ->limit()
                    ->searchable(),
            ])
            ->defaultSort('display_order', 'asc')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->button()->disableLabel(),
                Tables\Actions\DeleteAction::make()->button()->disableLabel(),
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
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
