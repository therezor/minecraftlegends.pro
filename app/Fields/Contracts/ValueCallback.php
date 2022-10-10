<?php

namespace App\Fields\Contracts;

interface ValueCallback
{
    public function __invoke($value, $entity, Field $field);
}
