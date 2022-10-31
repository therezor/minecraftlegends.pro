<?php

namespace App\Fields;

use Illuminate\Support\Str;

class Field extends BaseField
{
    public function limit(int $limit)
    {
        $this->valueCallback = (fn($value) => Str::limit($value, $limit));

        return $this;
    }

    public static function make(string $name): self
    {
        return new self($name);
    }
}
