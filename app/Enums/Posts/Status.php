<?php

namespace App\Enums\Posts;

use App\Enums\Selectable;

enum Status: string
{
    use Selectable;

    case DRAFT = 'DRAFT';
    case PUBLISHED = 'PUBLISHED';
    case ARCHIVE = 'ARCHIVE';
}
