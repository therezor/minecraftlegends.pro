<?php

namespace App\Fields;

class Email extends BaseField
{
    protected $template = 'fields.email';

    public static function make(string $name): self
    {
        return new self($name);
    }
}
