<?php

namespace App\Http\Components\Panel\Categories;

use App\Eloquent\Models\Category;
use App\Eloquent\Repositories\CategoryRepository;
use App\Http\Components\Panel\BaseForm;
use Illuminate\Validation\Rule;

class Form extends BaseForm
{
    public string $name = '';
    public string $icon = '';

    protected CategoryRepository $repository;

    public function boot(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function render()
    {
        return view('components.panel.categories.form');
    }

    public function submit()
    {
        $this->validate();

        $attributes = [
            'name' => $this->name,
            'icon' => $this->icon,
        ];

        $this->itemId
            ? $this->repository->update($this->itemId, $attributes)
            : $this->repository->create($attributes);

        return redirect()->route($this->routePrefix . '.index');
    }

    protected function fillProperties()
    {
        $item = $this->repository->findOrFail($this->itemId);
        $this->name = $item->name;
        $this->icon = $item->icon;
    }

    protected function rules(): array
    {
        return [
            'name' => [
                'string',
                'required',
                'max:255',
                Rule::unique(Category::class, 'name')->ignore($this->itemId)->withoutTrashed(),
            ],
            'icon' => [
                'string',
                'required',
                'max:255',
                Rule::unique(Category::class, 'icon')->ignore($this->itemId)->withoutTrashed(),
            ],
        ];
    }
}
