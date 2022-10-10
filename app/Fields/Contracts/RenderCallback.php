<?php

namespace App\Fields\Contracts;

interface RenderCallback
{
    public function __invoke($value, $entity, Field $field);
}
