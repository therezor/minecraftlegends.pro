<?php

namespace App\Fields;

class ArrayString extends BaseField
{
    protected $glue = ', ';

    public function glue($glue): self
    {
        $this->glue = $glue;

        return $this;
    }

    public function render($entity = null)
    {
        if ($this->template) {
            return $this->renderTemplate($entity);
        }

        return implode($this->glue, (array) $this->resolveValue($entity));
    }
}
