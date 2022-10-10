<?php

namespace App\Eloquent\Models\Contracts;

interface HasTranslation
{
    /**
     * Get prefix for attribute name translations
     *
     * @return string
     */
    public function getTranslationPrefix(): string;
}
