<?php

namespace App\Fields;

use Carbon\Carbon;

class Date extends BaseField
{
    protected $format = 'Y-m-d';

    public function __construct(string $name, $format = null)
    {
        if ($format) {
            $this->format = $format;
        }

        $this->valueCallback = function ($value, $entity, BaseField $field) {
            if (!$value) {
                return '';
            }

            if (!($value instanceof Carbon)) {
                $value = Carbon::parse($value);
            }

            return $value->format($this->getDateFormat());
        };

        parent::__construct($name);
    }

    protected function getDateFormat()
    {
        return $this->format;
    }
}
