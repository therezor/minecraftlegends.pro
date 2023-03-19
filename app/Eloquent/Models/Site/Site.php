<?php

namespace App\Eloquent\Models\Site;

use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use App\Eloquent\Models\Image;
use App\Eloquent\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;

class Site extends Model implements HasTranslation, HasValidation
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'sites';

    protected $fillable = [
        'user_id',
        'image_id',
        'name',
        'hostname',
        'domain',
        'meta_image_id',
        'meta_title',
        'meta_description',
    ];

    public function getTranslationPrefix(): string
    {
        return 'attributes';
    }

    public function getValidationRules(): array
    {
        return [
            'image_id' => [
                'nullable',
                Rule::exists(Image::class, 'id'),
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'hostname' => [
                'required',
                'string',
                'alpha_dash:ascii',
                'max:255',
                Rule::unique(static::class, 'hostname')->withoutTrashed()->ignore($this->id),
            ],
            'domain' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique(static::class, 'domain')->withoutTrashed()->ignore($this->id),
            ],
            'meta_image_id' => [
                'nullable',
                Rule::exists(Image::class, 'id'),
            ],
            'meta_title' => [
                'nullable',
                'string',
                'max:255',
            ],
            'meta_description' => [
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'image_id', 'id');
    }

    public function metaImage(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'meta_image_id', 'id');
    }
}
