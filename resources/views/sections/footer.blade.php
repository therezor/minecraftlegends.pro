<footer class="mt-auto p-4 bg-gray-50 sm:p-6 dark:bg-gray-800">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div class="flex items-center mb-4 sm:mb-0 text-sm text-gray-500 dark:text-gray-400">
                {!! nl2br(e(setting('footer_text'))) !!}
            </div>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                   {{ setting('copyright') }}
                </span>
            <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                @foreach(setting('social_icons', []) as $item)
                    <a href="{{ $item['url'] }}" target="_blank" rel="nofollow" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        {{ svg($item['icon'], 'w-5 h-5') }}
                    </a>
                @endforeach
            </div>
        </div>
    </div>
</footer>
