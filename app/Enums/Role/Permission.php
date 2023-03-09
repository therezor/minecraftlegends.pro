<?php

namespace App\Enums\Role;

use Illuminate\Support\Str;

enum Permission: string
{
    case ADMIN_DASHBOARD_VIEW = 'ADMIN_DASHBOARD_VIEW';

    case ADMIN_POST_CATEGORIES_LIST = 'ADMIN_POST_CATEGORIES_LIST';
    case ADMIN_POST_CATEGORIES_CREATE = 'ADMIN_POST_CATEGORIES_CREATE';
    case ADMIN_POST_CATEGORIES_EDIT = 'ADMIN_POST_CATEGORIES_EDIT';
    case ADMIN_POST_CATEGORIES_DELETE = 'ADMIN_POST_CATEGORIES_DELETE';

    case ADMIN_ROLES_LIST = 'ADMIN_ROLES_LIST';
    case ADMIN_ROLES_CREATE = 'ADMIN_ROLES_CREATE';
    case ADMIN_ROLES_EDIT = 'ADMIN_ROLES_EDIT';
    case ADMIN_ROLES_DELETE = 'ADMIN_ROLES_DELETE';

    case ADMIN_USERS_LIST = 'ADMIN_USERS_LIST';
    case ADMIN_USERS_CREATE = 'ADMIN_USERS_CREATE';
    case ADMIN_USERS_EDIT = 'ADMIN_USERS_EDIT';
    case ADMIN_USERS_DELETE = 'ADMIN_USERS_DELETE';

    case ADMIN_POSTS_LIST = 'ADMIN_POSTS_LIST';
    case ADMIN_POSTS_CREATE = 'ADMIN_POSTS_CREATE';
    case ADMIN_POSTS_EDIT = 'ADMIN_POSTS_EDIT';
    case ADMIN_POSTS_DELETE = 'ADMIN_POSTS_DELETE';

    case ADMIN_SITES_LIST = 'ADMIN_SITES_LIST';
    case ADMIN_SITES_CREATE = 'ADMIN_SITES_CREATE';
    case ADMIN_SITES_EDIT = 'ADMIN_SITES_EDIT';
    case ADMIN_SITES_DELETE = 'ADMIN_SITES_DELETE';

    public static function select()
    {
        $select = [];
        foreach (self::cases() as $case) {
            $title = Str::title($case->name);
            $title = Str::replaceFirst('_', ' -> ', $title);
            $title = Str::replaceLast('_', ' -> ', $title);
            $title = Str::replaceFirst('_', ' ', $title);
            $select[$case->value] = $title;
        }

        return $select;
    }
}
