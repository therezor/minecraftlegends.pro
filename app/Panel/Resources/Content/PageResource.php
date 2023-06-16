<?php

namespace App\Panel\Resources\Content;

use App\Enums\Access\Role\Permission;
use App\Enums\Content\Page\Template;
use App\Models\Content\Page;
use App\Panel\Resources\Content\PageResource\Pages;
use App\Panel\Resources\Traits\HasPath;
use Filament\Forms;
use Filament\Forms\Components\Builder;
use Filament\Resources\Form;
use App\Panel\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Support\Str;
use Wiebenieuwenhuis\FilamentCharCounter\TextInput;

class PageResource extends Resource
{
    use HasPath;

    protected static ?string $model = Page::class;
    protected static ?string $slug = 'content/pages';
    protected static ?string $recordTitleAttribute = 'name';
    protected static ?string $navigationIcon = 'heroicon-o-document';
    protected static ?int $navigationSort = 96;

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
                Forms\Components\Grid::make()
                    ->columnSpan(['lg' => 2])
                    ->schema([
                        Forms\Components\Card::make()
                            ->columns(2)
                            ->schema([
                                TextInput::make('name')
                                    ->label(__('attributes.name'))
                                    ->required()
                                    ->maxLength(255)
                                    ->lazy()
                                    ->afterStateUpdated(
                                        fn(string $context, $state, callable $set) => $context === 'create' ? $set(
                                            'path.slug',
                                            Str::slug($state)
                                        ) : null
                                    )->columnSpan('full'),

                                Forms\Components\Select::make('template')
                                    ->label(__('attributes.template'))
                                    ->options(Template::select())
                                    ->default(Template::DEFAULT)
                                    ->reactive()
                                    ->columnSpan('full'),
                            ]),

                        Builder::make('content')
                            ->disableLabel()
                            ->label(__('attributes.content'))
                            ->columnSpan(2)
                            ->blocks([
                                Builder\Block::make('heading')
                                    ->schema([
                                        TextInput::make('content')
                                            ->label('Heading')
                                            ->required(),
                                        Forms\Components\Select::make('level')
                                            ->options([
                                                'h1' => 'Heading 1',
                                                'h2' => 'Heading 2',
                                                'h3' => 'Heading 3',
                                                'h4' => 'Heading 4',
                                                'h5' => 'Heading 5',
                                                'h6' => 'Heading 6',
                                            ])
                                            ->required(),
                                    ]),
                                Builder\Block::make('paragraph')
                                    ->schema([
                                        Forms\Components\Textarea::make('content')
                                            ->label('Paragraph')
                                            ->required(),
                                    ]),
                                Builder\Block::make('image')
                                    ->schema([
                                        Forms\Components\FileUpload::make('url')
                                            ->label('Image')
                                            ->image()
                                            ->required(),
                                        TextInput::make('alt')
                                            ->label('Alt text')
                                            ->required(),
                                    ]),
                            ]),
                    ]),


                Forms\Components\Grid::make()
                    ->columnSpan(['lg' => 1])
                    ->schema([
                        static::formPathSection(false)
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('attributes.name'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('path.slug')
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
