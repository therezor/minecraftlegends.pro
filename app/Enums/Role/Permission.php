<?php

namespace App\Enums\Role;

use Illuminate\Support\Str;

enum Permission: string
{
    case PANEL_DASHBOARD_VIEW = 'PANEL_DASHBOARD_VIEW';

    case PANEL_POST_CATEGORIES_LIST = 'PANEL_POST_CATEGORIES_LIST';
    case PANEL_POST_CATEGORIES_CREATE = 'PANEL_POST_CATEGORIES_CREATE';
    case PANEL_POST_CATEGORIES_EDIT = 'PANEL_POST_CATEGORIES_EDIT';
    case PANEL_POST_CATEGORIES_DELETE = 'PANEL_POST_CATEGORIES_DELETE';

    case PANEL_ROLES_LIST = 'PANEL_ROLES_LIST';
    case PANEL_ROLES_CREATE = 'PANEL_ROLES_CREATE';
    case PANEL_ROLES_EDIT = 'PANEL_ROLES_EDIT';
    case PANEL_ROLES_DELETE = 'PANEL_ROLES_DELETE';

    case PANEL_USERS_LIST = 'PANEL_USERS_LIST';
    case PANEL_USERS_CREATE = 'PANEL_USERS_CREATE';
    case PANEL_USERS_EDIT = 'PANEL_USERS_EDIT';
    case PANEL_USERS_DELETE = 'PANEL_USERS_DELETE';

    case PANEL_POSTS_LIST = 'PANEL_POSTS_LIST';
    case PANEL_POSTS_CREATE = 'PANEL_POSTS_CREATE';
    case PANEL_POSTS_EDIT = 'PANEL_POSTS_EDIT';
    case PANEL_POSTS_DELETE = 'PANEL_POSTS_DELETE';

    case PANEL_SITES_LIST = 'PANEL_SITES_LIST';
    case PANEL_SITES_CREATE = 'PANEL_SITES_CREATE';
    case PANEL_SITES_EDIT = 'PANEL_SITES_EDIT';
    case PANEL_SITES_DELETE = 'PANEL_SITES_DELETE';

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
