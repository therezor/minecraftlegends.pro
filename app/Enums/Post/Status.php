<?php

namespace App\Enums\Post;

use App\Enums\Selectable;

enum Status: string
{
    use Selectable;

    case DRAFT = 'DRAFT';
    case PUBLISHED = 'PUBLISHED';
    case ARCHIVE = 'ARCHIVE';
}
