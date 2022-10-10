<?php

namespace App\Fields\Contracts;

interface Field
{
    /**
     * Field name
     *
     * @return string
     */
    public function getName(): string;
}
