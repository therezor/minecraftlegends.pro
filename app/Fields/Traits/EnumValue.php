<?php

namespace App\Fields\Traits;

use App\Fields\BaseField;
use Illuminate\Support\Str;

trait EnumValue
{
    public function enum()
    {
        $this->valueCallback = function ($value, $entity, BaseField $field) {
            if (null === $value) {
                return $value;
            }

            if (is_iterable($value)) {
                $names = [];

                foreach ($value as $k => $v) {
                    $names[$k] = Str::replace('_', ' ', Str::title($v));
                }

                return $names;
            }

            return Str::replace('_', ' ', Str::title($value));
        };

        return $this;
    }
}
