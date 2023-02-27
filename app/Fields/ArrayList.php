<?php

namespace App\Fields;

class ArrayList extends BaseField
{
    protected ?string $template = 'fields.array';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
