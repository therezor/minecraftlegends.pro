<?php

namespace App\Enums\Post;

use App\Enums\Selectable;

enum Status: int
{
    use Selectable;

    case DRAFT = 0;
    case PUBLISHED = 1;
    case ARCHIVE = 2;
}
