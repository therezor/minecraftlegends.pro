<?php

namespace App\Eloquent\Transformers;

use App\Eloquent\Models\Block;


class BlockTransformer
{
    protected Block $block;

    public function __construct(Block $block)
    {
        $this->block = $block;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->block->id,
            'type' => $this->block->type->value,
            'display_order' => $this->block->display_order,
            'title' => $this->block->title,
            'description' => $this->block->description,
            'data' => $this->block->data,
        ];
    }
}
