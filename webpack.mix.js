const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
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
    // .sass('resources/sass/main.scss', 'css/app.css')
    .js('resources/js/app.js', 'js/app.js')
    .js('resources/js/modules/editor.js', 'js/editor.js')
    .version('public/js/html-editor.js')
    .sourceMaps();

mix.sass('resources/sass/panel.scss', 'public/css', {}, [
    tailwindcss('./panel.config.js')
])
    .options({
        processCssUrls: false,
    });

// mix.sass('resources/sass/app.scss', 'public/css')
//     .options({
//         postCss: [ tailwindcss('./tailwind.config.js') ],
//     })

if (mix.inProduction()) {
    mix.sourceMaps(false);
    mix.version();
} else {
    // Uses inline source-maps on development
    mix.webpackConfig({
        devtool: 'inline-source-map'
    });
}

