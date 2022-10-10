<?php

namespace App\Forms\Traits;

use App\Eloquent\Models\Contracts\HasValidation;
use Illuminate\Support\Arr;

trait DefaultModelRules
{
    protected function getModelRules($name, $model)
    {
        if ($model instanceof HasValidation) {
            return Arr::get($model->getValidationRules(), $name, []);
        }

        return [];
    }
}
