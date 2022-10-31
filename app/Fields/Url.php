<?php

namespace App\Fields;

class Url extends BaseField
{
    protected $template = 'fields.url';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
