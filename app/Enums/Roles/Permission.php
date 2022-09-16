<?php

namespace App\Enums\Roles;

use App\Enums\Selectable;

enum Permission: string
{
    use Selectable;

    case DASHBOARD_VIEW = 'DASHBOARD_VIEW';

    case CATEGORIES_LIST = 'CATEGORIES_LIST';
    case CATEGORIES_CREATE = 'CATEGORIES_CREATE';
    case CATEGORIES_EDIT = 'CATEGORIES_EDIT';
    case CATEGORIES_DELETE = 'CATEGORIES_DELETE';

    case ROLES_LIST = 'ROLES_LIST';
    case ROLES_CREATE = 'ROLES_CREATE';
    case ROLES_EDIT = 'ROLES_EDIT';
    case ROLES_DELETE = 'ROLES_DELETE';

    case USERS_LIST = 'USERS_LIST';
    case USERS_CREATE = 'USERS_CREATE';
    case USERS_EDIT = 'USERS_EDIT';
    case USERS_DELETE = 'USERS_DELETE';

    case POSTS_LIST = 'POSTS_LIST';
    case POSTS_CREATE = 'POSTS_CREATE';
    case POSTS_EDIT = 'POSTS_EDIT';
    case POSTS_DELETE = 'POSTS_DELETE';
}
