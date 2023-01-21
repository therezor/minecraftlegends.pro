<?php

namespace App\Eloquent\Casts;

use App\Eloquent\Casts\Dto\Content;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class ContentCast implements CastsAttributes
{
    protected array $config = [];

    public function get($model, string $key, $value, array $attributes)
    {
        return $value
            ? new Content($value)
            : null;
    }

    public function set($model, string $key, $value, array $attributes)
    {
        if ($value instanceof Content) {
            return $value->sanitize()->toJson();
        }

        return (new Content($value))->sanitize()->toJson();
    }
}
