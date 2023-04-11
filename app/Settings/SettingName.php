<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class SettingName extends Settings
{
    public static function group(): string
    {
        return 'groupName';
    }
}
