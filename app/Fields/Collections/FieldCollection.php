<?php

namespace App\Fields\Collections;

use Illuminate\Support\Collection;
use App\Fields\Contracts\Field;

class FieldCollection extends Collection
{
    public function onlySortable(): self
    {
        return $this->filter(function (Field $field) {
            return true === $field->isSortable() && null !== $field->getName();
        });
    }

    public function pluckNames()
    {
        $attributes = [];

        foreach ($this->all() as $field) {
            $attributes[] = $field->getName();
        }

        return $attributes;
    }

    public function firstByName($name)
    {
        return $this->first(function (Field $field) use ($name) {
            return $field->getName() === $name;
        });
    }
}
