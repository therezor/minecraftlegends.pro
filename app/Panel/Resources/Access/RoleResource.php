<?php

namespace App\Panel\Resources\Access;

use App\Enums\Access\Role\Permission;
use App\Panel\Resources\Access\RoleResource\Pages;
use App\Panel\Resources\Access\RoleResource\RelationManagers;
use App\Panel\Resources\Traits\HasPermission;
use App\Models\Access\Role;
use App\Models\Access\User;
use App\Services\AvatarService;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Validation\Rules\Enum;
use Wiebenieuwenhuis\FilamentCharCounter\TextInput;

class RoleResource extends Resource
{
    use HasPermission;

    protected static ?string $model = Role::class;
    protected static ?string $slug = 'access/roles';
    protected static ?string $recordTitleAttribute = 'name';
    protected static ?string $navigationIcon = 'heroicon-o-shield-check';
    protected static ?int $navigationSort = 99;

    protected static function getNavigationGroup(): ?string
    {
        return __('panel.access.title');
    }

    protected static function getPermission(): Permission
    {
        return Permission::PANEL_ACCESS_ROLES;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->columns(3)
            ->schema([
                Forms\Components\Card::make()
                    ->columnSpan(['lg' => 2])
                    ->schema([
                        Forms\Components\CheckboxList::make('permissions')
                            ->label(__('attributes.permissions'))
                            ->nullable()
                            ->nestedRecursiveRules([new Enum(Permission::class)])
                            ->options(Permission::select()),
                    ]),
                Forms\Components\Card::make()
                    ->columnSpan(['lg' => 1])
                    ->schema([
                        TextInput::make('name')
                            ->label(__('attributes.name'))
                            ->required()
                            ->maxLength(255),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('attributes.name'))
                    ->limit()
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TagsColumn::make('permissions')
                    ->label(__('attributes.permissions'))
                    ->getStateUsing(function (Role $record): array {
                        return array_map(
                            fn($value) => __('enums.access.role.permission.' . $value),
                            $record->permissions
                        );
                    }),
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
            'index' => Pages\ListRoles::route('/'),
            'create' => Pages\CreateRole::route('/create'),
            'edit' => Pages\EditRole::route('/{record}/edit'),
        ];
    }
}
