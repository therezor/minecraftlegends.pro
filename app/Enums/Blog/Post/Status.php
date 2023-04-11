<?php

namespace App\Enums\Blog\Post;

use App\Enums\Translatable;

enum Status: int
{
    use Translatable;

    case DRAFT = 0;
    case PUBLISHED = 1;

    case SCHEDULED = 2;
    case ARCHIVE = 3;
}
