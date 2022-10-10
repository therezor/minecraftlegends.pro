<?php

namespace App\Forms\Traits;

use App\Eloquent\Models\Contracts\HasTranslation;

trait TranslatableModel
{
    protected function setModelTranslations($model)
    {
        if ($model instanceof HasTranslation) {
            $this->setLanguageName($model->getTranslationPrefix());
        }
    }
}
