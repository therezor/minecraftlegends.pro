<?php

namespace App\Enums;

use Illuminate\Support\Str;

trait Selectable
{
    public static function select()
    {
        $select = [];
        foreach (self::cases() as $case) {
            $select[$case->value] = Str::replace('_', ' ', Str::title($case->name));
        }

        return $select;
    }
}
