<section @class([
        'bg-white dark:bg-gray-900' => $data['bg_shade'] === \App\Enums\Content\Page\Shade::LIGHTER->value,
        'bg-gray-50 dark:bg-gray-800' => $data['bg_shade'] === \App\Enums\Content\Page\Shade::DARKER->value,
])>
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mb-8 max-w-screen-md lg:mb-16">
            <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                {{ $data['heading'] }}
            </h2>
            @if($data['sub_heading'])
                <p class="text-gray-500 sm:text-xl dark:text-gray-400">
                    {{ $data['sub_heading'] }}
                </p>
            @endif
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            @foreach($data['items'] as $item)
                <div>
                    <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        {{ svg($item['icon'], 'w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300') }}
                    </div>
                    <h3 class="mb-2 text-xl font-bold dark:text-white">
                        {{ $item['title'] }}
                    </h3>
                    <p class="text-gray-500 dark:text-gray-400">
                        {{ $item['description'] }}
                    </p>
                </div>
            @endforeach
        </div>
    </div>
</section>
