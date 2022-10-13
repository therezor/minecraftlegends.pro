<?php

namespace App\Eloquent\Models;

use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use App\Enums\Block\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class Block extends Model implements HasTranslation, HasValidation
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'post_id',
        'type',
        'display_order',
        'title',
        'description',
        'data',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'type' => Type::class,
        'display_order' => 'int',
        'data' => 'json',
    ];

    public function getTranslationPrefix(): string
    {
        return 'attributes';
    }

    public function getValidationRules(): array
    {
        return [
            'post_id' => [
                'required',
                Rule::exists(Post::class, 'id'),
            ],
            'type' => [
                'required',
                new Enum(Type::class),
            ],
            'display_order' => [
                'required',
                'int',
                'min:0',
                'max:255',
            ],
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => [
                'required',
                'string',
                'max:500',
            ],
            'data' => [
                'nullable',
                'json',
            ],
        ];
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'post_id', 'id');
    }
}
