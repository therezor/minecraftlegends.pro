<?php

namespace App\Fields\Traits;

use Illuminate\Support\Arr;

trait HasMeta
{
    protected $meta = [];

    public function meta($value, $key = null): self
    {
        if (null !== $key) {
            Arr::set($this->meta, $key, $value);

            return $this;
        }

        $this->meta = $value;

        return $this;
    }

    public function getMeta($key = null)
    {
        if (null !== $key) {
            return Arr::get($this->meta, $key);
        }

        return $this->meta;
    }
}
