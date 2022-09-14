<?php

namespace App\Enums\Roles;

use App\Enums\Selectable;

enum Permission: string
{
    use Selectable;

    case ROLES = 'ROLES';
    case USERS = 'USERS';
}
