<?php

namespace App\Models\Traits;

use App\Models\MetaTag;
use App\Models\Slug;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasSlugAndMeta
{
    public function getMorphClass()
    {
        return $this->table;
    }

    public function slug(): MorphOne
    {
        return $this->morphOne(Slug::class, 'entity');
    }

    public function meta(): MorphOne
    {
        return $this->morphOne(MetaTag::class, 'entity');
    }
}
