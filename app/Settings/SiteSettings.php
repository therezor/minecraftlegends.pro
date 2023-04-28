<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;
class SiteSettings extends Settings
{
    public string $name;
    public string $locale;
    public string $favicon;
    public string $logo;
    public bool $active;

    public static function group(): string
    {
        return 'site';
    }
}
