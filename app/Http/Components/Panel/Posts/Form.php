<?php

namespace App\Http\Components\Panel\Posts;

use App\Eloquent\Models\Category;
use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\PostRepository;
use App\Enums\Posts\Status;
use App\Http\Components\Panel\BaseForm;
use App\Rules\YoutubeRule;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class Form extends BaseForm
{
    public string $title = '';
    public string $slug = '';
    public string $intro = '';
    public ?string $videoUrl = null;
    public ?string $status = null;
    public ?int $categoryId = null;

    protected PostRepository $postRepository;
    protected CategoryRepository $categoryRepository;

    public function boot(PostRepository $postRepository, CategoryRepository $categoryRepository)
    {
        $this->postRepository = $postRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function render()
    {
        $categoriesSelect = $this->categoryRepository->select();

        return view('components.panel.posts.form', ['categoriesSelect' => $categoriesSelect]);
    }

    public function submit()
    {
        $this->validate();

        $attributes = [
            'title' => $this->title,
            'slug' => $this->slug,
            'intro' => $this->intro,
            'status' => $this->status,
            'category_id' => $this->categoryId,
            'video_url' => $this->videoUrl,
        ];

        if (!$this->itemId) {
            $attributes['user_id'] = auth()->id();
        }

        $this->itemId
            ? $this->postRepository->update($this->itemId, $attributes)
            : $this->postRepository->create($attributes);

        return redirect()->route($this->routePrefix . '.index');
    }

    protected function fillProperties()
    {
        /** @var Post $item */
        $item = $this->postRepository->findOrFail($this->itemId);
        $this->title = $item->title;
        $this->slug = $item->slug;
        $this->intro = $item->intro;
        $this->status = $item->status->value;
        $this->categoryId = $item->category_id;
        $this->videoUrl = $item->video_url;
    }

    protected function rules(): array
    {
        return [
            'title' => [
                'string',
                'required',
                'max:255',
            ],
            'slug' => [
                'string',
                'required',
                'alpha_dash',
                'max:255',
                Rule::unique(Post::class, 'slug')->ignore($this->itemId)->withoutTrashed(),
            ],
            'status' => [
                'required',
                new Enum(Status::class),
            ],
            'intro' => [
                'string',
                'max:65000',
            ],
            'categoryId' => [
                'nullable',
                Rule::exists(Category::class, 'id')
            ],
            'videoUrl' => [
                'string',
                'max:255',
                'url',
                new YoutubeRule(),
            ],
        ];
    }
}
