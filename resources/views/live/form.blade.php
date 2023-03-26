@if($success)

    <div class="text-xl text-gray-700 font-medium" yoyo:ignore>
        Thank you for registering!
    </div>

@else

    <form class="flex flex-col space-y-4 w-72">

        @csrf

        <div class="mt-3">
            <div>
                <label for="name" class="block text-sm font-medium leading-5 text-gray-700">Name</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                    <input id="name"
                           name="data[name]"
                           yoyo:post="validate"
                           yoyo:on="keyup delay:300ms changed"
                           value="{{ $data['name'] ?? '' }}"
                           class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Your Name"
                    >
                </div>
                @spinning(empty($data['name']))
                <p class="mt-2 text-sm text-red-600" id="name-error">Name is required.</p>
                @endspinning
            </div>
        </div>
        <div class="mt-3">
            <div>
                <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                    <input id="email"
                           name="data[email]"
                           yoyo:post="validate"
                           yoyo:on="keyup delay:300ms changed"
                           value="{{ $data['email'] ?? '' }}"
                           class="form-input block w-full sm:text-sm sm:leading-5" placeholder="you@example.com"
                    />
                </div>
                @spinning(empty($data['email']))
                <p class="mt-2 text-sm text-red-600" id="email-error">Email is required.</p>
                @endspinning
            </div>
        </div>

        <div class="inline-flex rounded-md shadow-sm">
            <button

                yoyo:post="register"
                yoyo:on="click"
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent leading-5 font-medium rounded text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700 transition ease-in-out duration-150"
            >
                Submit
            </button>
        </div>
    </form>

@endif
