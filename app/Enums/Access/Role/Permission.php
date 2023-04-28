<?php

namespace App\Enums\Access\Role;

use App\Enums\Translatable;

enum Permission: string
{
    use Translatable;

    case PANEL = 'PANEL';

    case PANEL_BLOG_POSTS = 'PANEL_BLOG_POSTS';
    case PANEL_BlOG_CATEGORIES = 'PANEL_BlOG_CATEGORIES';

    case PANEL_CONTENT_PAGES = 'PANEL_CONTENT_PAGES';

    case PANEL_ACCESS_ROLES = 'PANEL_ACCESS_ROLES';
    case PANEL_ACCESS_USERS = 'PANEL_ACCESS_USERS';

    case PANEL_SETTINGS_SITE = 'PANEL_SETTINGS_SITE';
}
