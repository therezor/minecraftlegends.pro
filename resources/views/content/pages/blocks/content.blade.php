<section @class([
        'bg-white dark:bg-gray-900' => $data['bg_shade'] === \App\Enums\Content\Page\Shade::LIGHTER->value,
        'bg-gray-50 dark:bg-gray-800' => $data['bg_shade'] === \App\Enums\Content\Page\Shade::DARKER->value,
])>
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        @if($data['image_align'] === \App\Enums\Content\Page\Align::LEFT->value)
            <div class="mt-8">
                <img class="w-full rounded-lg aspect-video object-cover" src="{{ Storage::disk('public')->url($data['image']) }}" alt="{{ $data['heading'] }}">
            </div>
        @endif

        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">{{ $data['heading'] }}</h2>
            <p>{{ $data['description'] }}</p>
        </div>

        @if($data['image_align'] === \App\Enums\Content\Page\Align::RIGHT->value)
            <div class="mt-8">
                <img class="w-full rounded-lg aspect-video object-cover" src="{{ Storage::disk('public')->url($data['image']) }}" alt="{{ $data['heading'] }}">
            </div>
        @endif
    </div>
</section>
