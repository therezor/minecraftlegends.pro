<?php

namespace App\Fields;

class Icon extends BaseField
{
    protected $template = 'fields.icon';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
