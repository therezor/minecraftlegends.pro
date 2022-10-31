<?php

namespace App\Fields;

class ArrayList extends BaseField
{
    protected $template = 'fields.array';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
