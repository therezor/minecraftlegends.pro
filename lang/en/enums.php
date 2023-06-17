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

    'content' => [
        'page' => [
            'block' => [
                \App\Enums\Content\Page\Block::ACTION->value => 'Action',
                \App\Enums\Content\Page\Block::BLOG->value => 'Blog',
                \App\Enums\Content\Page\Block::CONTACT->value => 'Contact',
                \App\Enums\Content\Page\Block::CONTENT->value => 'Content',
                \App\Enums\Content\Page\Block::FAQ->value => 'FAQ',
                \App\Enums\Content\Page\Block::FEATURE->value => 'Feature',
                \App\Enums\Content\Page\Block::HERO->value => 'Hero',
                \App\Enums\Content\Page\Block::LOGO_CLOUD->value => 'Logo Cloud',
                \App\Enums\Content\Page\Block::PORTFOLIO->value => 'Portfolio',
                \App\Enums\Content\Page\Block::TESTIMONIAL->value => 'Testimonial',
            ],
            'shade' => [
                \App\Enums\Content\Page\Shade::LIGHTER->value => 'Lighter',
                \App\Enums\Content\Page\Shade::DARKER->value => 'Darker',
            ],
            'template' => [
                \App\Enums\Content\Page\Template::DEFAULT->value => 'Default',
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
                \App\Enums\Access\Role\Permission::PANEL_CONTENT_LAYOUTS->value => 'Panel -> Content -> Layouts',
                \App\Enums\Access\Role\Permission::PANEL_ACCESS_USERS->value => 'Panel -> Access -> Users',
                \App\Enums\Access\Role\Permission::PANEL_ACCESS_ROLES->value => 'Panel -> Access -> Roles',
                \App\Enums\Access\Role\Permission::PANEL_SETTINGS_GENERAL->value => 'Panel -> Settings -> General',
                \App\Enums\Access\Role\Permission::PANEL_SETTINGS_MAILER->value => 'Panel -> Settings -> Mailer',
            ],
        ],
    ],
];
