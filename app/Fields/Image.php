<?php

namespace App\Fields;

class Image extends BaseField
{
    protected $template = 'fields.image';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
