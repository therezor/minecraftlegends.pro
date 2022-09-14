<?php

namespace App\Http\Controllers\Auth;

use App\Eloquent\Models\User;
use App\Eloquent\Repositories\RoleRepository;
use App\Eloquent\Repositories\UserRepository;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegistrationRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;


class RegistrationController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \App\Http\Requests\Auth\RegistrationRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegistrationRequest $request, UserRepository $userRepository, RoleRepository $roleRepository)
    {
        $attributes = $request->validated();

        /** @var User $user */
        $user = $userRepository->create($attributes);

        event(new Registered($user));

        Auth::login($user);

        return redirect('/');
    }
}
