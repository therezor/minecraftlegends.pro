<?php

namespace App\Enums\Roles;

use App\Enums\Selectable;

enum Permission: string
{
    use Selectable;

    case DASHBOARD_VIEW = 'DASHBOARD_VIEW';

    case ROLES_LIST = 'ROLES_LIST';
    case ROLES_CREATE = 'ROLES_CREATE';
    case ROLES_EDIT = 'ROLES_EDIT';
    case ROLES_DELETE = 'ROLES_DELETE';

    case USERS_LIST = 'USERS_LIST';
    case USERS_CREATE = 'USERS_CREATE';
    case USERS_EDIT = 'USERS_EDIT';
    case USERS_DELETE = 'USERS_DELETE';
}
