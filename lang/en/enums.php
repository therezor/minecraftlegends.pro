<?php

return [
    'blog' => [
        'post' => [
            'status' => [
                \App\Enums\Blog\Post\Status::DRAFT->value => 'Draft',
                \App\Enums\Blog\Post\Status::PUBLISHED->value => 'Published',
                \App\Enums\Blog\Post\Status::ARCHIVE->value => 'Archive',
                \App\Enums\Blog\Post\Status::SCHEDULED->value => 'Scheduled',
            ],
        ],
    ],

    'access' => [
        'role' => [
            'permission' => [
                \App\Enums\Access\Role\Permission::PANEL->value => 'Panel',
                \App\Enums\Access\Role\Permission::PANEL_BLOG_POSTS->value => 'Panel -> Blog -> Posts',
                \App\Enums\Access\Role\Permission::PANEL_BlOG_CATEGORIES->value => 'Panel -> Blog -> Categories',
                \App\Enums\Access\Role\Permission::PANEL_CONTENT_PAGES->value => 'Panel -> Content -> Pages',
                \App\Enums\Access\Role\Permission::PANEL_ACCESS_USERS->value => 'Panel -> Access -> Users',
                \App\Enums\Access\Role\Permission::PANEL_ACCESS_ROLES->value => 'Panel -> Access -> Roles',
                \App\Enums\Access\Role\Permission::PANEL_SETTINGS_GENERAL->value => 'Panel -> Settings -> General',
                \App\Enums\Access\Role\Permission::PANEL_SETTINGS_MAILER->value => 'Panel -> Settings -> Mailer',
            ],
        ],
    ],
];
