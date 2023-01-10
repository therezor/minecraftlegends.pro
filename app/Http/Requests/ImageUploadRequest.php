<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Concerns\ValidatesAttributes;

class ImageUploadRequest extends FormRequest
{
    use ValidatesAttributes;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image' => ['required', 'mimes:jpg,jpeg,bmp,png', 'max:10240'],
        ];
    }
}
