<?php

namespace App\Http\Components\Panel\Roles;

use App\Eloquent\Models\Role;
use App\Eloquent\Repositories\RoleRepository;
use App\Enums\Role\Permission;
use App\Http\Components\Panel\BaseForm;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class Form extends BaseForm
{
    public string $name = '';
    public array $permissions = [];

    protected RoleRepository $repository;

    public function boot(RoleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function render()
    {
        return view('components.panel.roles.form');
    }

    public function submit()
    {
        $this->validate();

        $attributes = [
            'name' => $this->name,
            'permissions' => $this->permissions,
        ];

        $this->itemId
            ? $this->repository->update($this->itemId, $attributes)
            : $this->repository->create($attributes);

        return redirect()->route($this->routePrefix . '.index');
    }

    protected function fillProperties()
    {
        /** @var Role $item */
        $item = $this->repository->findOrFail($this->itemId);
        $this->name = $item->name;
        $this->permissions = $item->permissions;
    }

    protected function rules(): array
    {
        return [
            'name' => [
                'string',
                'required',
                'max:255',
                Rule::unique(Role::class, 'name')->ignore($this->itemId)->withoutTrashed(),
            ],
            'permissions' => [
                'nullable',
                'array',
            ],
            'permissions.*' => [
                new Enum(Permission::class)
            ],
        ];
    }
}
