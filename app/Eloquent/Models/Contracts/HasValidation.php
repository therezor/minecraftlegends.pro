<?php

namespace App\Eloquent\Models\Contracts;

interface HasValidation
{
    /**
     * Get array of validation rules
     *
     * @return array
     */
    public function getValidationRules(): array;
}
