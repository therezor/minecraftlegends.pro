<?php

namespace App\Fields;

class Time extends Date
{
    protected string $format = 'H:i:s';

    public static function make(string $name, string $format = null): self
    {
        return new self($name, $format);
    }
}
