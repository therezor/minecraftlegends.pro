<?php

namespace App\Http\Components\Panel\Roles;

use App\Eloquent\Repositories\RoleRepository;
use App\Enums\Roles\Permission;
use Illuminate\Validation\Rules\Enum;
use Livewire\Component;

class Form extends Component
{
    public string $name = '';
    public array $permissions = [];

    public ?string $itemId;
    public string $routePrefix;

    protected RoleRepository $repository;

    public function boot(RoleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function mount(string $routePrefix, string $itemId = null)
    {
        $this->routePrefix = $routePrefix;
        $this->itemId = $itemId;
        if ($this->itemId) {
            $item = $this->repository->findOrFail($this->itemId);
            $this->name = $item->name;
            $this->permissions = $item->permissions;
        }
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

    protected function rules(): array
    {
        return [
            'name' => [
                'string',
                'required',
                'max:255',
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
