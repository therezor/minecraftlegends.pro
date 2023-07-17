<?php

namespace App\Enums\Content\Page;

use App\Enums\Translatable;

enum Align: string
{
    use Translatable;

    case RIGHT = 'right';
    case LEFT = 'left';
}
