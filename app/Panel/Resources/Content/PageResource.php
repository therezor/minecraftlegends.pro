<?php

namespace App\Panel\Resources\Content;

use App\Models\Content\Page;
use App\Enums\Access\Role\Permission;
use App\Panel\Resources\Content\PageResource\Pages;
use App\Panel\Resources\Content\PageResource\RelationManagers;
use App\Panel\Resources\Traits\HasPermission;
use App\Panel\Resources\Traits\HasSeo;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Support\Str;
use Mohamedsabil83\FilamentFormsTinyeditor\Components\TinyEditor;
use Wiebenieuwenhuis\FilamentCharCounter\TextInput;
use Z3d0X\FilamentFabricator\Forms\Components\PageBuilder;

class PageResource extends Resource
{
    use HasSeo;
    use HasPermission;

    protected static ?string $model = Page::class;
    protected static ?string $slug = 'content/pages';
    protected static ?string $recordTitleAttribute = 'name';
    protected static ?string $navigationIcon = 'heroicon-o-document';
    protected static ?int $navigationSort = 97;

    protected static function getNavigationGroup(): ?string
    {
        return __('panel.content.title');
    }

    protected static function getPermission(): Permission
    {
        return Permission::PANEL_CONTENT_PAGES;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->columns(3)
            ->schema([
                Forms\Components\Card::make()
                    ->columnSpan(['lg' => 2])
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')
                            ->label(__('attributes.title'))
                            ->required()
                            ->maxLength(255)
                            ->lazy()
                            ->afterStateUpdated(
                                fn(string $context, $state, callable $set) => $context === 'create' ? $set(
                                    'slug',
                                    Str::slug($state)
                                ) : null
                            ),

                        Forms\Components\Select::make('user_id')
                            ->label(__('attributes.author'))
                            ->relationship('author', 'name')
                            ->searchable()
                            ->default(auth()->id())
                            ->required(),

                        PageBuilder::make('blocks')
                            ->label(__('filament-fabricator::page-resource.labels.blocks')),

                        TinyEditor::make('content')::make('content')
                            ->label(__('attributes.content'))
                            ->required()
                            ->showMenuBar()
                            ->columnSpan('full'),
                    ]),

                static::formSeoSection()->columnSpan(['lg' => 1]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label(__('attributes.title'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('slug')
                    ->label(__('attributes.slug'))
                    ->searchable()
                    ->sortable(),
            ])
            ->defaultSort('id', 'desc')
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
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
