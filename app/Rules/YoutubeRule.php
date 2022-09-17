<?php

namespace App\Rules;

use App\Eloquent\Repositories\PostRepository;
use Illuminate\Contracts\Validation\Rule;

class YoutubeRule implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return preg_match(
            PostRepository::YOUTUBE_REGEX,
            $value
        ) !== false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be youtube url.';
    }
}
