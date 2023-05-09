<?php

namespace App\Rules;

use App\Models\Casts\Dto\Content;
use EditorJS\EditorJSException;
use Illuminate\Contracts\Validation\Rule;

class ContentRule implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        try {
            return (new Content((string)$value))->validate();
        } catch (EditorJSException $e) {
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return __('Content is invalid.');
    }
}
