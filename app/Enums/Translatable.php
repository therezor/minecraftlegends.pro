<?php

namespace App\Enums;

use Illuminate\Support\Str;

trait Translatable
{
    public static function select()
    {
        $translationPrefix = static::translationPrefix();

        $select = [];
        foreach (self::cases() as $case) {
            $select[$case->value] = __($translationPrefix . '.' . $case->value);
        }

        return $select;
    }

    public function translatedValue(): string
    {
        return __(static::translationPrefix() . '.' . $this->value);
    }

    protected static function translationPrefix(): string
    {
        return Str::of(static::class)
            ->ltrim(app()->getNamespace())
            ->lower()
            ->replace('\\', '.');
    }
}
