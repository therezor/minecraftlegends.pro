<?php

namespace App\Eloquent\Models\Site;

use App\Eloquent\Models\Contracts\HasTranslation;
use App\Eloquent\Models\Contracts\HasValidation;
use App\Eloquent\Models\Image;
use App\Rules\ContentRule;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;

class Page extends Model implements HasTranslation, HasValidation
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'site_pages';

    protected $fillable = [
        'site_id',
        'name',
        'slug',
        'type',
        'meta_image_id',
        'meta_title',
        'meta_description',
        'content',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public function getTranslationPrefix(): string
    {
        return 'attributes';
    }

    public function getValidationRules(): array
    {
        return [
            'site_id' => [
                'required',
                Rule::exists(Site::class, 'id'),
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'slug' => [
                'required',
                'alpha_dash',
                'max:255',
                Rule::unique(Page::class, 'slug')->where('site_id', $this->site_id)->withoutTrashed()->ignore($this->id),
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
            'content' => [
                'required',
                'string',
                new ContentRule(),
            ],
        ];
    }

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class, 'site_id', 'id');
    }

    public function metaImage(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'meta_image_id', 'id');
    }
}
