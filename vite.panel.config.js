import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            buildDirectory: 'panel',
            input: [
                'resources/sass/panel.scss',
            ],
            refresh: true,
        }),
    ],
    css: {
        postcss: {
            plugins: [
                require('tailwindcss/nesting'),
                require('tailwindcss')({
                    config: './tailwind.panel.config.js',
                }),
                require('autoprefixer'),
            ],
        },
    },
});
