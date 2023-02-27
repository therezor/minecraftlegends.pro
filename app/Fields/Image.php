<?php

namespace App\Fields;

class Image extends BaseField
{
    protected ?string $template = 'fields.image';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
