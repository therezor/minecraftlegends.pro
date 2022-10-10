<?php

namespace App\Http\Components\Panel\Posts;

use App\Eloquent\Models\Category;
use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\ImageRepository;
use App\Eloquent\Repositories\PostRepository;
use App\Enums\Post\Status;
use App\Http\Components\Panel\BaseForm;
use App\Rules\YoutubeRule;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Livewire\TemporaryUploadedFile;
use Livewire\WithFileUploads;

class Block extends BaseForm
{
    use WithFileUploads;

    public ?string $title = null;
    public int $position = 1;
    public string $content = '';
    public ?string $videoUrl = null;
    public ?string $imageUrl = null;
    public array $blocks = [];
    public TemporaryUploadedFile|string|null $imageUpload = null;

    protected PostRepository $postRepository;
    protected CategoryRepository $categoryRepository;
    protected ImageRepository $imageRepository;

    public function boot(PostRepository $postRepository, CategoryRepository $categoryRepository, ImageRepository $imageRepository)
    {
        $this->postRepository = $postRepository;
        $this->categoryRepository = $categoryRepository;
        $this->imageRepository = $imageRepository;
    }

    public function render()
    {
        return view('components.panel.posts.block');
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

        $this->itemId
            ? $this->update($attributes)
            : $this->create($attributes);

        return redirect()->route($this->routePrefix . '.index');
    }

    public function updatedImageUpload()
    {
        $this->validate([
            'imageUpload' => ['image', 'max:10240'],
        ]);

        $this->imageUrl = ($this->imageUpload instanceof TemporaryUploadedFile)
            ? $this->imageUpload->temporaryUrl()
            : null;
    }

    public function removeImage()
    {
        $this->imageUpload = null;
        $this->imageUrl = null;
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
        $this->imageUrl = $item->image_id ? $item->image->url : null;
    }

    protected function update(array $attributes)
    {
        if (!$this->imageUrl) {
            $attributes['image_id'] = null;
        }

        if ($this->imageUpload) {
            $attributes['image_id'] = $this->imageRepository->upload($this->imageUpload)->id;
        }

        $this->postRepository->update($this->itemId, $attributes);

        if (!$this->imageUrl) {
            // Delete old image
            /** @var Post $item */
            $item = $this->postRepository->findOrFail($this->itemId);
            if ($item->image_id) {
                $this->imageRepository->delete($item->image_id);
            }
        }
    }

    protected function create(array $attributes)
    {
        $attributes['user_id'] = auth()->id();
        if ($this->imageUpload) {
            $attributes['image_id'] = $this->imageRepository->upload($this->imageUpload)->id;
        }

        $this->postRepository->create($attributes);
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
                'nullable',
                'string',
                'max:255',
                'url',
                new YoutubeRule(),
            ],
        ];
    }
}
