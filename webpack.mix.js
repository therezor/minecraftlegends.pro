const mix = require('laravel-mix');
require('laravel-mix-purgecss');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public/')
    .sass('resources/sass/main.scss', 'css/app.css')

    .js('resources/js/app.js', 'js/app.js')
    .js('resources/js/modules/editor.js', 'js/editor.js')
    .version('public/js/html-editor.js')
    .purgeCss({
        skippedContentGlobs: ['bootstrap-icons.css'],
        safelist: {
            standard: [
                'bi',
                /^bi-/
            ],
            greedy: [
                /* Bootstrap */
                /popover/,
                /tooltip/,
                /modal/,
                /fade/,
                /show/,
                /hide/,
                /alert/,
                /badge/,
                /bg/,
                /arrow/,
                /collapse/,
                /collapsing/
            ]
        },
        enabled: mix.inProduction()
    })
    .sourceMaps();

if (mix.inProduction()) {
    mix.sourceMaps(false);
    mix.version();
} else {
    // Uses inline source-maps on development
    mix.webpackConfig({
        devtool: 'inline-source-map'
    });
}

