<?php

namespace App\Panel\Resources\Content;

use App\Models\Content\Page;
use App\Enums\Access\Role\Permission;
use App\Panel\Resources\Content\PageResource\Pages;
use App\Panel\Resources\Content\PageResource\RelationManagers;
use App\Panel\Resources\Traits\HasPermission;
use App\Panel\Resources\Traits\HasSeo;
use Camya\Filament\Forms\Components\TitleWithSlugInput;
use Camya\Filament\Forms\Fields\SlugInput;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Mohamedsabil83\FilamentFormsTinyeditor\Components\TinyEditor;
use Wiebenieuwenhuis\FilamentCharCounter\TextInput;
use Filament\Forms\Components\Builder;
use Closure;

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
                                            'slug',
                                            Str::slug($state)
                                        ) : null
                                    )->columnSpan('full'),

                                SlugInput::make('slug')
                                    ->disableLabel()
                                    ->slugInputRecordSlug(fn (?Model $record) => $record?->slug)
                                    ->slugInputLabelPrefix(false)
                                    ->slugInputBaseUrl(null),


                                Forms\Components\Select::make('type')
                                    ->label(__('attributes.type'))
                                    ->options([
                                        0 => 'Home',
                                        1 => 'Blog post',
                                    ])
                                    ->reactive()
                                    ->columnSpan('full'),

                                Forms\Components\Toggle::make('has_header')
                                    ->label(__('attributes.has_header')),
                                Forms\Components\Toggle::make('has_footer')
                                    ->label(__('attributes.has_footer')),
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
                                        Forms\Components\MarkdownEditor::make('content')
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
                        static::formSeoSection()
                            ->hidden(fn(Closure $get) => $get('type') === '1'),
                    ]),
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
