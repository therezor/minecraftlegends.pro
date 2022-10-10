const mix = require('laravel-mix');

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
    // Default
    .sass('resources/css/app.scss', 'css/app.css')
    .sass('resources/css/bootstrap-icons.scss', 'css/bootstrap-icons.css')
    .js('resources/js/app.js', 'js/app.js')
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

