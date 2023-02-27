<?php

namespace App\Fields;

class Url extends BaseField
{
    protected ?string $template = 'fields.url';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
