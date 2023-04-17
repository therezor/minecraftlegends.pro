<?php

namespace App\Filament\Resources\Access;

use App\Enums\Access\Role\Permission;
use App\Filament\Resources\Access\UserResource\Pages;
use App\Filament\Resources\Access\UserResource\RelationManagers;
use App\Filament\Resources\Traits\HasPermission;
use App\Models\Access\Role;
use App\Models\Access\User;
use App\Services\AvatarService;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Wiebenieuwenhuis\FilamentCharCounter\TextInput;

class UserResource extends Resource
{
    use HasPermission;

    protected static ?string $model = User::class;
    protected static ?string $slug = 'access/users';
    protected static ?string $recordTitleAttribute = 'name';
    protected static ?string $navigationIcon = 'heroicon-o-user';
    protected static ?int $navigationSort = 98;

    protected static function getNavigationGroup(): ?string
    {
        return __('panel.access.title');
    }

    protected static function getPermission(): Permission
    {
        return Permission::PANEL_ACCESS_USERS;
    }

    public static function form(Form $form): Form
    {
        return $form
        ->columns(3)
        ->schema([
            Forms\Components\Card::make()
                ->columnSpan(['lg' => 2])
                ->schema([
                    TextInput::make('name')
                        ->label(__('attributes.name'))
                        ->required()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('email')
                        ->required()
                        ->email()
                        ->unique(table: static::$model, ignorable: fn ($record) => $record)
                        ->label(__('attributes.email')),
                    Forms\Components\TextInput::make('password')
                        ->password()
                        ->required(fn ($component, $get, $livewire, $model, $record, $set, $state) => $record === null)
                        ->label(__('attributes.password')),
                    Forms\Components\Select::make('role_id')
                        ->required()
                        ->exists(Role::class, 'id')
                        ->relationship('role', 'name')
                        ->preload()
                        ->label(__('attributes.role')),
                ]),
            Forms\Components\Section::make(__('attributes.profile_image'))
                ->columnSpan(['lg' => 1])
                ->schema([
                    Forms\Components\FileUpload::make('profile_image')
                        ->disableLabel()
                        ->disk('public')
                        ->image()
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('1:1')
                        ->imageResizeTargetWidth('400')
                        ->imageResizeTargetHeight('400')
                        ->imageResizeUpscale(false)
                        ->columnSpan('full'),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('profile_image')
                    ->label(__('attributes.profile_image'))
                    ->circular()
                    ->grow(false)
                    ->getStateUsing(function (User $record): string {
                        return app(AvatarService::class)->get($record);
                    }),
                Tables\Columns\TextColumn::make('name')
                    ->label(__('attributes.name'))
                    ->limit()
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label(__('attributes.email'))
                    ->limit()
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('role.name')
                    ->label(__('attributes.role')),
            ])
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
