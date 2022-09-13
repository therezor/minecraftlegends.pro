<?php

namespace App\Http\Requests\Traits;

trait EmailToLower
{
    public function validationData()
    {
        $this->merge([
            'email' => mb_strtolower($this->input('email')),
        ]);

        return $this->all();
    }
}
