<?php

namespace App\Fields\Helpers;

use App\Fields\Contracts\Field;

interface LabelCallback
{
    public function __invoke($name, Field $field);
}
