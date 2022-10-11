<?php

namespace App\Eloquent\Models;

use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;

class Page extends Model implements HasTranslation, HasValidation
{
    use SoftDeletes;

    protected $table = 'pages';

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'content',
        'description',
        'og_title',
        'og_description',
    ];

    public function getTranslationPrefix(): string
    {
        return 'attributes';
    }

    public function getValidationRules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'slug' => [
                'required',
                'alpha_dash',
                'max:255',
                Rule::unique(Page::class, 'slug')->withoutTrashed()->ignore($this->id),
            ],
            'description' => [
                'nullable',
                'string',
                'max:500',
            ],
            'content' => [
                'required',
                'string',
            ],
            'og_title' => [
                'nullable',
                'string',
                'max:255',
            ],
            'og_description' => [
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
