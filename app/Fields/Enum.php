<?php

namespace App\Fields;

use Illuminate\Support\Str;

class Enum extends BaseField
{
    public function __construct(string $name)
    {
        $this->valueCallback = function ($value, $entity, $field) {
            if ($value instanceof \UnitEnum) {
                return Str::replace('_', ' ', Str::title($value->name));
            }

            return $value;
        };

        parent::__construct($name);
    }
}
