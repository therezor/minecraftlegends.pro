<?php

namespace App\Fields;

class Boolean extends BaseField
{
    protected $template = 'fields.boolean';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
