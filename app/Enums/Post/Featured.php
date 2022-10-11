<?php

namespace App\Enums\Post;

enum Featured: int
{
    case DEFAULT = 0;
    case FEATURED = 1;
    case EDITOR_CHOICE = 2;
}
