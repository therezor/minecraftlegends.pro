<?php

namespace App\Panel\Resources\Blog;

use App\Enums\Access\Role\Permission;
use App\Enums\Blog\Post\Status;
use App\Models\Blog\Category;
use App\Models\Blog\Post;
use App\Panel\Resources\Blog\PostResource\Pages;
use App\Panel\Resources\Traits\HasPath;
use Filament\Forms;
use Filament\Resources\Form;
use App\Panel\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use FilamentEditorJs\Forms\Components\EditorJs;
use Illuminate\Support\Str;
use Wiebenieuwenhuis\FilamentCharCounter\TextInput;

class PostResource extends Resource
{
    use HasPath;

    protected static ?string $model = Post::class;
    protected static ?string $slug = 'blog/posts';
    protected static ?string $recordTitleAttribute = 'title';
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?int $navigationSort = 1;

    protected static function getNavigationGroup(): ?string
    {
        return __('panel.blog.title');
    }

    protected static function getPermission(): Permission
    {
        return Permission::PANEL_BLOG_POSTS;
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
                                    'path.slug',
                                    Str::slug($state)
                                ) : null
                            )->columnSpan('full'),

                        Forms\Components\FileUpload::make('image')
                            ->label(__('attributes.image'))
                            ->disk('public')
                            ->image()
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('1.91:1')
                            ->imageResizeTargetWidth('1200')
                            ->imageResizeTargetHeight('630')
                            ->imageResizeUpscale(false)
                            ->columnSpan('full'),

                        Forms\Components\MarkdownEditor::make('description')
                            ->label(__('attributes.description'))
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'edit',
                                'preview',
                            ])
                            ->columnSpan('full'),

                        Forms\Components\Select::make('category_id')
                            ->relationship('category', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->createOptionForm([
                                TextInput::make('name')
                                    ->label(__('attributes.name'))
                                    ->required()
                                    ->maxLength(255)
                                    ->lazy()
                                    ->afterStateUpdated(
                                        fn(string $context, $state, callable $set) => $set(
                                            'slug',
                                            Str::slug($state)
                                        )
                                    ),
                                Forms\Components\TextInput::make('slug')
                                    ->label(__('attributes.slug'))
                                    ->required()
                                    ->alphaDash()
                                    ->maxLength(255)
                                    ->unique(Category::class, 'slug', ignoreRecord: true),
                            ])
                            ->createOptionAction(function (Forms\Components\Actions\Action $action) {
                                return $action
                                    ->modalHeading(__('panel.blog.post.create_category'))
                                    ->modalButton(__('panel.blog.post.create'))
                                    ->modalWidth('lg')
                                    ->mutateFormDataUsing(function (array $data): array {
                                        $data['display_order'] = (int)Category::max('display_order') + 1;

                                        return $data;
                                    });
                            }),

                        Forms\Components\Select::make('user_id')
                            ->label(__('attributes.author'))
                            ->relationship('author', 'name')
                            ->searchable()
                            ->default(auth()->id())
                            ->required(),

                        Forms\Components\Select::make('status')
                            ->label(__('attributes.status'))
                            ->options(Status::select())
                            ->default(Status::DRAFT)
                            ->required(),

                        Forms\Components\DateTimePicker::make('published_at')
                            ->label(__('attributes.published_at'))
                            ->default(now()),
                    ]),

                static::formPathSection()->columnSpan(['lg' => 1]),

                Forms\Components\Section::make(__('attributes.content'))
                    ->columnSpan('full')
                    ->schema([
                        EditorJs::make('content')::make('content')
                            ->disableLabel()
                            ->required(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label(__('attributes.image'))
                    ->width(50),
                Tables\Columns\TextColumn::make('title')
                    ->label(__('attributes.title'))
                    ->limit()
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('published_at')
                    ->label(__('attributes.published_at'))
                    ->dateTime(),
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
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
