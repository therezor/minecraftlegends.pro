<?php
/**
 * @see https://github.com/artesaos/seotools
 */

return [
    'meta' => [
        /*
         * The default configurations to be used by the meta generator.
         */
        'defaults' => [
            'title' => env('APP_NAME'),
            // set false to total remove
            'titleBefore' => false,
            // Put defaults.title before page title, like 'It's Over 9000! - Dashboard'
            'description' => 'Welcome to Minecraft Legends fan site. Here you can track the latest news and modifications, download mods,  share the experience with others, and give helpful advice to new users.',
            // set false to total remove
            'separator' => ' - ',
            'keywords' => [],
            'canonical' => 'current',
            // Set to null or 'full' to use Url::full(), set to 'current' to use Url::current(), set false to total remove
            'robots' => 'all',
            // Set to 'all', 'none' or any combination of index/noindex and follow/nofollow
        ],
        /*
         * Webmaster tags are always added.
         */
        'webmaster_tags' => [
            'google' => null,
            'bing' => null,
            'alexa' => null,
            'pinterest' => null,
            'yandex' => null,
            'norton' => null,
        ],

        'add_notranslate_class' => false,
    ],
    'opengraph' => [
        /*
         * The default configurations to be used by the opengraph generator.
         */
        'defaults' => [
            'title' => env('APP_NAME'), // set false to total remove
            'description' => null, // set false to total remove
            'url' => null, // Set null for using Url::current(), set false to total remove
            'type' => 'website',
            'site_name' => env('APP_NAME'),
            'images' => [
                env('APP_URL') . '/img/og-image.jpg',
            ],
        ],
    ],
    'twitter' => [
        /*
         * The default values to be used by the twitter cards generator.
         */
        'defaults' => [
            'card' => 'summary_large_image',
            'site' => env('APP_NAME'),
            'image' => env('APP_URL') . '/img/og-image.jpg',
        ],
    ],
    'json-ld' => [
        /*
         * The default configurations to be used by the json-ld generator.
         */
        'defaults' => [
        ],
    ],
];
