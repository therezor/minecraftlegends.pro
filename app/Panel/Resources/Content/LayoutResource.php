<?php

namespace App\Panel\Resources\Content;

use App\Enums\Access\Role\Permission;
use App\Enums\Content\Layout\Type;
use App\Panel\Resources\Content\LayoutResource\Pages;
use App\Panel\Resources\Content\LayoutResource\RelationManagers;
use App\Models\Content\Layout;
use App\Panel\Resources\Traits\HasPermission;
use Filament\Forms;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Component;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Support\Str;
use Wiebenieuwenhuis\FilamentCharCounter\TextInput;

class LayoutResource extends Resource
{
    use HasPermission;

    protected static ?string $model = Layout::class;
    protected static ?string $slug = 'content/layouts';
    protected static ?string $recordTitleAttribute = 'name';
    protected static ?string $navigationIcon = 'heroicon-o-template';
    protected static ?int $navigationSort = 97;

    protected static function getNavigationGroup(): ?string
    {
        return __('panel.content.title');
    }

    protected static function getPermission(): Permission
    {
        return Permission::PANEL_CONTENT_LAYOUTS;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->columns(3)
            ->schema([
                Forms\Components\Grid::make()
                    ->columnSpan(['lg' => 2])
                    ->schema([
                        Builder::make('blocks')
                            ->label(__('attributes.content'))
                            ->default([(string) Str::uuid() => ['type' => 'content']])
                            ->view('panel.forms.content.layout.builder')
                            ->disableLabel()
                            ->reorderableWithButtons()
                            ->columnSpan('full')
                            ->blocks([
                                Builder\Block::make('content')
                                    ->disabled()
                                    ->schema([
                                    Forms\Components\Placeholder::make('content')
                                        ->disableLabel()
                                        ->content(__('attributes.content')),
                                ]),

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

                Forms\Components\Card::make()
                    ->columnSpan(['lg' => 1])
                    ->schema([
                        TextInput::make('name')
                            ->label(__('attributes.name'))
                            ->required()
                            ->maxLength(255)
                            ->columnSpan('full'),

                        Forms\Components\Select::make('type')
                            ->label(__('attributes.type'))
                            ->required()
                            ->options(Type::select())
                            ->columnSpan('full'),
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
            'index' => Pages\ListLayouts::route('/'),
            'create' => Pages\CreateLayout::route('/create'),
            'edit' => Pages\EditLayout::route('/{record}/edit'),
        ];
    }
}
