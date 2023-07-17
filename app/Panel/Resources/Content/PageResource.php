<?php

namespace App\Panel\Resources\Content;

use App\Enums\Access\Role\Permission;
use App\Enums\Content\Page\Align;
use App\Enums\Content\Page\Block;
use App\Enums\Content\Page\Shade;
use App\Enums\Content\Page\Template;
use App\Models\Content\Page;
use App\Models\Path;
use App\Panel\Resources\Content\PageResource\Pages;
use App\Panel\Resources\Traits\HasPath;
use Filament\Forms;
use Filament\Forms\Components\Builder;
use Filament\Resources\Form;
use App\Panel\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Guava\FilamentIconPicker\Forms\IconPicker;
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

                                Forms\Components\Toggle::make('show_in_header')
                                    ->label(__('attributes.show_in_header')),
                                Forms\Components\Toggle::make('show_in_footer')
                                    ->label(__('attributes.show_in_footer')),
                            ]),

                        Builder::make('content')
                            ->disableLabel()
                            ->label(__('attributes.content'))
                            ->columnSpan(2)
                            ->collapsible()
                            ->blocks(static::formContentBlocks()),
                    ]),


                Forms\Components\Grid::make()
                    ->columnSpan(['lg' => 1])
                    ->schema([
                        static::formPathSection(),
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

    protected static function formContentBlocks(): array
    {
        return [
            Builder\Block::make(Block::HERO->value)
                ->label(Block::HERO->translatedValue())
                ->icon('heroicon-o-home')
                ->schema([
                    static::blockBgShade(),
                    Forms\Components\TextInput::make('heading')
                        ->label(__('attributes.heading'))
                        ->required(),
                    Forms\Components\TextInput::make('sub_heading')
                        ->label(__('attributes.sub_heading')),
                    Forms\Components\TextInput::make('action')
                        ->label(__('attributes.action'))
                        ->requiredWith('link'),
                    Forms\Components\TextInput::make('link')
                        ->label(__('attributes.link'))
                        ->requiredWith('action'),
                ]),
            Builder\Block::make(Block::LOGO_CLOUD->value)
                ->label(Block::LOGO_CLOUD->translatedValue())
                ->icon('heroicon-o-cloud')
                ->schema([
                    static::blockBgShade(),
                    Forms\Components\FileUpload::make('logos')
                        ->label(__('attributes.logo'))
                        ->image()
                        ->multiple()
                        ->maxFiles(6)
                        ->required(),
                ]),
            Builder\Block::make(Block::FEATURE->value)
                ->label(Block::FEATURE->translatedValue())
                ->icon('heroicon-o-star')
                ->schema([
                    static::blockBgShade(),
                    Forms\Components\TextInput::make('heading')
                        ->label(__('attributes.heading')),
                    Forms\Components\TextInput::make('sub_heading')
                        ->label(__('attributes.sub_heading')),
                    Forms\Components\Repeater::make('items')
                        ->label(__('attributes.items'))
                        ->schema([
                            IconPicker::make('icon')
                                ->label(__('attributes.icon'))
                                ->required(),
                            Forms\Components\TextInput::make('title')
                                ->label(__('attributes.title'))
                                ->required(),
                            Forms\Components\Textarea::make('description')
                                ->label(__('attributes.description'))
                                ->required(),
                        ]),
                ]),
            Builder\Block::make(Block::CONTENT->value)
                ->label(Block::CONTENT->translatedValue())
                ->icon('heroicon-o-document-text')
                ->schema([
                    static::blockBgShade(),
                    Forms\Components\TextInput::make('heading')
                        ->label(__('attributes.heading'))
                        ->required(),
                    Forms\Components\Textarea::make('description')
                        ->label(__('attributes.description'))
                        ->required(),
                    Forms\Components\FileUpload::make('image')
                        ->label(__('attributes.image'))
                        ->image()
                        ->required(),
                    Forms\Components\Select::make('image_align')
                        ->label(__('attributes.image_align'))
                        ->required()
                        ->options(Align::select())
                        ->default(Align::RIGHT->value),
                ]),
            Builder\Block::make(Block::TESTIMONIAL->value)
                ->label(Block::TESTIMONIAL->translatedValue())
                ->icon('heroicon-o-chat-alt-2')
                ->schema([
                    static::blockBgShade(),
                    Forms\Components\Textarea::make('text')
                        ->label(__('attributes.text'))
                        ->required(),
                    Forms\Components\TextInput::make('name')
                        ->label(__('attributes.name'))
                        ->required(),
                    Forms\Components\TextInput::make('position')
                        ->label(__('attributes.position')),
                    Forms\Components\FileUpload::make('photo')
                        ->label(__('attributes.photo'))
                        ->image()
                        ->required(),
                ]),
            Builder\Block::make(Block::ACTION->value)
                ->label(Block::ACTION->translatedValue())
                ->icon('heroicon-o-lightning-bolt')
                ->schema([
                    static::blockBgShade(),
                    Forms\Components\TextInput::make('heading')
                        ->label(__('attributes.heading'))
                        ->required(),
                    Forms\Components\TextInput::make('description')
                        ->label(__('attributes.description')),
                    Forms\Components\TextInput::make('action')
                        ->label(__('attributes.action'))
                        ->required(),
                    Forms\Components\TextInput::make('link')
                        ->label(__('attributes.link'))
                        ->required(),
                ]),
        ];
    }

    protected static function blockBgShade(): Forms\Components\Select
    {
        return Forms\Components\Select::make('bg_shade')
            ->label(__('attributes.bg_shade'))
            ->required()
            ->options(Shade::select())
            ->default(Shade::LIGHTER->value);
    }
}
