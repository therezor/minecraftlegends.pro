<?php

namespace App\Enums\Post;

use App\Enums\Selectable;

enum Featured: int
{
    use Selectable;

    case DEFAULT = 0;
    case FEATURED = 1;
    case EDITOR_CHOICE = 2;
}
