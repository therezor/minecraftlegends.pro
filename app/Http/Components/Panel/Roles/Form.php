<?php

namespace App\Http\Components\Panel\Roles;

use App\Eloquent\Repositories\RoleRepository;
use App\Enums\Roles\Permission;
use App\Enums\Roles\Type;
use Illuminate\Validation\Rules\Enum;
use Livewire\Component;

class Form extends Component
{
    public string $name = '';
    public string $type = '';
    public array $permissions = [];

    public string $routePrefix;

    protected RoleRepository $repository;

    public function booted(RoleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function mount(string $routePrefix, string $id = null)
    {
        $this->routePrefix = $routePrefix;
        $this->type = Type::REGULAR->value;
        if ($id) {
            $item = $this->repository->findOrFail($id);
            $this->name = $item->name;
            $this->type = $item->type;
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

        $this->repository->create([
            'name' => $this->name,
            'type' => $this->type,
            'permissions' => $this->permissions,
        ]);

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
            'type' => [
                'required',
                new Enum(Type::class)
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
