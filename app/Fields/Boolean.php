<?php

namespace App\Fields;

class Boolean extends BaseField
{
    protected ?string $template = 'fields.boolean';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
