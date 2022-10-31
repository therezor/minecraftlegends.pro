<?php

namespace App\Fields;

class DateTime extends Date
{
    protected string $format = 'Y-m-d H:i:s';

    public static function make(string $name, string $format = null): self
    {
        return new self($name, $format);
    }
}
