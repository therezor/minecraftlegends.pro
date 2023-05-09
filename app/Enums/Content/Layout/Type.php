<?php

namespace App\Enums\Content\Layout;

use App\Enums\Translatable;

enum Type: string
{
    use Translatable;

    case PAGE = 'PAGE';
    case BLOG_POST = 'BLOG_POST';
    case BLOG_CATEGORY = 'BLOG_CATEGORY';
}
