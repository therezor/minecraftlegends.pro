import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                // 'resources/css/app.scss',
                'resources/css/panel.scss',
                'resources/js/app.js'
            ],
            refresh: true,
        }),
    ],
});
