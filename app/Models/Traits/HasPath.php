<?php

namespace App\Models\Traits;

use App\Models\Path;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasPath
{
    public static function boot()
    {
        parent::boot();

        static::deleting(function (Model $model) {
            $model->path()->delete();
        });
    }

    public function path(): MorphOne
    {
        return $this->morphOne(Path::class, 'entity');
    }
}
