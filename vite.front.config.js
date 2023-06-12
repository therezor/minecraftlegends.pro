import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            buildDirectory: 'front',
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
    css: {
        postcss: {
            plugins: [
                require('tailwindcss/nesting'),
                require('tailwindcss')({
                    config: './tailwind.front.config.js',
                }),
                require('autoprefixer'),
            ],
        },
    },
});
