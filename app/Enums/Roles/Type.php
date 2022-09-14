<?php

namespace App\Enums\Roles;

use App\Enums\Selectable;

enum Type: string
{
    use Selectable;

    case DEFAULT = 'DEFAULT';
    case REGULAR = 'REGULAR';
    case SUPER_ADMIN = 'SUPER_ADMIN';
}
