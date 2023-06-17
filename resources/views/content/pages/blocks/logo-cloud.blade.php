<section @class([
        'bg-white dark:bg-gray-900' => $data['bg_shade'] === \App\Enums\Content\Page\Shade::LIGHTER->value,
        'bg-gray-50 dark:bg-gray-800' => $data['bg_shade'] === \App\Enums\Content\Page\Shade::DARKER->value,
])>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div class="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
            @foreach($data['logos'] as $logo)
                <div class="flex justify-center items-center">
                    <img src="{{ Storage::disk('public')->url($logo) }}" class="h-9" alt="...">
                </div>
            @endforeach
        </div>
    </div>
</section>
