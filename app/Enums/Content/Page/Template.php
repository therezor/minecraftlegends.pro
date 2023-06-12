<?php

namespace App\Enums\Content\Page;

use App\Enums\Translatable;

enum Template: int
{
    use Translatable;

    case DEFAULT = 0;
}
