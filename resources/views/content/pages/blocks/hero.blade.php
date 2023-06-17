<section @class([
        'bg-white dark:bg-gray-900' => $data['bg_shade'] === \App\Enums\Content\Page\Shade::LIGHTER->value,
        'bg-gray-50 dark:bg-gray-800' => $data['bg_shade'] === \App\Enums\Content\Page\Shade::DARKER->value,
])>
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                {{ $data['heading'] }}
            </h1>
            @if($data['sub_heading'])
                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                    {{ $data['sub_heading'] }}
                </p>
            @endif
            @if($data['link'] && $data['action'])
                <a href="{{ $data['link'] }}" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    {{ $data['action'] }}
                </a>
            @endif
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup">
        </div>
    </div>
</section>
