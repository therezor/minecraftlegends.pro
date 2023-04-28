<?php

namespace App\Panel\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class MyBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('my')
            ->schema([
                TextInput::make('name'),
            ]);
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}
