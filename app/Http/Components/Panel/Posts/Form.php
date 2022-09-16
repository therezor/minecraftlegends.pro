<?php

namespace App\Http\Components\Panel\Posts;

use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\PostRepository;
use App\Enums\Posts\Status;
use App\Http\Components\Panel\BaseForm;
use Illuminate\Validation\Rules\Enum;

class Form extends BaseForm
{
    public string $title = '';
    public string $intro = '';
    public Status $status;

    protected PostRepository $repository;

    public function boot(PostRepository $repository)
    {
        $this->repository = $repository;
    }

    public function render()
    {
        return view('components.panel.posts.form');
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
        /** @var Post $item */
        $item = $this->repository->findOrFail($this->itemId);
        $this->title = $item->title;
        $this->intro = $item->intro;
        $this->status = $item->status;
    }

    protected function rules(): array
    {
        return [
            'title' => [
                'string',
                'required',
                'max:255',
            ],
            'status' => [
                'required',
                new Enum(Status::class),
            ],
            'intro' => [
                'string',
                'required',
                'max:65000',
            ],
        ];
    }
}
