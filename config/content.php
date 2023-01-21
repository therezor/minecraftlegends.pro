<?php

use App\Enums\Content\Type;

return [
    'tools' => [
        Type::HEADER->value => [
            'text' => [
                'type' => 'string',
                'required' => true,
            ],
            'level' => [
                'type' => 'int',
                'required' => true,
                'canBeOnly' => [2, 3, 4],
            ],
        ],
        Type::PARAGRAPH->value => [
            'text' => [
                'type' => 'string',
                'required' => true,
                'allowedTags' => 'a[href],i,b,strong,em',
            ],
        ],
        Type::QUOTE->value => [
            'text' => [
                'type' => 'string',
                'required' => true,
            ],
            'caption' => [
                'type' => 'string',
            ],
            'alignment' => [
                'type' => 'string',
                'required' => true,
                'canBeOnly' => ['left', 'center'],
            ],
        ],
        Type::WARNING->value => [
            'title' => [
                'type' => 'string',
                'required' => true,
            ],
            'message' => [
                'type' => 'string',
                'required' => true,
            ],
        ],
        Type::LIST->value => [
            'style' => [
                'type' => 'string',
                'required' => true,
                'canBeOnly' => ['ordered', 'unordered'],
            ],
            'items' => [
                'type' => 'array',
                'required' => true,
                'data' => [
                    '-' => [
                        'type' => 'string',
                    ],
                ],
            ],
        ],
        Type::EMBED->value => [
            'service' => [
                'type' => 'string',
                'required' => true,
            ],
            'source' => [
                'type' => 'string',
                'required' => true,
            ],
            'embed' => [
                'type' => 'string',
                'required' => true,
            ],
            'width' => [
                'type' => 'int',
            ],
            'height' => [
                'type' => 'int',
            ],
            'caption' => [
                'type' => 'string',
            ],
        ],
        Type::IMAGE->value => [
            'file' => [
                'type' => 'array',
                'data' => [
                    'id' => [
                        'type' => 'string',
                        'required' => true,
                    ],
                    'url' => [
                        'type' => 'string',
                        'required' => true,
                    ],
                ],
            ],
            'caption' => [
                'type' => 'string',
            ],
            'withBorder' => [
                'type' => 'bool',
            ],
            'stretched' => [
                'type' => 'bool',
            ],
            'withBackground' => [
                'type' => 'bool',
            ],
        ],
    ],
];
