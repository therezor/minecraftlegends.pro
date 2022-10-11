<?php

namespace App\Fields\Contracts;

interface LabelCallback
{
    public function __invoke($name, Field $field);
}
