<?php

namespace App\Http\Crud\Traits;

trait Hookable
{
    public function beforeStore($entity, &$fieldValues)
    {
    }

    public function afterStore($entity, $fieldValues)
    {
    }

    public function beforeUpdate($entity, &$fieldValues)
    {
    }

    public function afterUpdate($entity, $fieldValues)
    {
    }

    public function beforeDestroy($entity)
    {
    }

    public function afterDestroy($entity)
    {
    }
}
