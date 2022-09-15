<?php

namespace App\Http\Components\Panel\Users;

use App\Eloquent\Models\Role;
use App\Eloquent\Models\User;
use App\Eloquent\Repositories\RoleRepository;
use App\Eloquent\Repositories\UserRepository;
use App\Http\Components\Panel\BaseForm;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class Form extends BaseForm
{
    public string $name = '';
    public string $email = '';
    public string $password = '';
    public string $roleId = '';

    protected UserRepository $userRepository;
    protected RoleRepository $roleRepository;

    public function boot(UserRepository $userRepository, RoleRepository $roleRepository)
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }

    public function render()
    {
        $rolesSelect = $this->roleRepository->select();

        return view('components.panel.users.form', ['rolesSelect' => $rolesSelect]);
    }

    public function submit()
    {
        $this->validate();

        $attributes = [
            'name' => $this->name,
            'email' => $this->email,
            'role_id' => $this->roleId,
            'password' => $this->password,
        ];

        $this->itemId
            ? $this->userRepository->update($this->itemId, $attributes)
            : $this->userRepository->create($attributes);

        return redirect()->route($this->routePrefix . '.index');
    }

    protected function fillProperties()
    {
        $item = $this->userRepository->findOrFail($this->itemId);
        $this->name = $item->name;
        $this->email = $item->email;
        $this->roleId = $item->role_id;
    }

    protected function rules(): array
    {
        return [
            'name' => [
                'string',
                'required',
                'max:255',
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->itemId)
            ],
            'password' => [
                'nullable',
                Rules\Password::defaults()
            ],
            'roleId' => [
                'nullable',
                Rule::exists(Role::class, 'id')
            ],
        ];
    }
}
