<?php

namespace App\Enums\Content\Page;

use App\Enums\Translatable;

enum Shade: string
{
    use Translatable;

    case LIGHTER = 'lighter';
    case DARKER = 'darker';
}
