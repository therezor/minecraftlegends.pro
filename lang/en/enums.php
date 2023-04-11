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
];
