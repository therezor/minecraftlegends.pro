<?php

namespace App\Http\Requests\Auth;

use App\Eloquent\Models\User;
use App\Http\Requests\Traits\EmailToLower;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class RegistrationRequest extends FormRequest
{
    use EmailToLower;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }
}
