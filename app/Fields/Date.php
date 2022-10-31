<?php

namespace App\Fields;

use Carbon\Carbon;

class Date extends BaseField
{
    protected string $format = 'Y-m-d';

    public function __construct(string $name, string $format = null)
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

    public static function make(string $name, string $format = null): self
    {
        return new self($name, $format);
    }

    protected function getDateFormat(): string
    {
        return $this->format;
    }
}
