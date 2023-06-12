<div
    {{
        $attributes->class([
            'filament-tables-container rounded border border-gray-300 bg-white shadow-sm',
            'dark:border-gray-700 dark:bg-gray-800' => config('tables.dark_mode'),
        ])
    }}
>
    {{ $slot }}
</div>
