<?php

namespace App\Fields;

class Email extends BaseField
{
    protected ?string $template = 'fields.email';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
