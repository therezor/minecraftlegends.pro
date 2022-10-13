<?php

namespace App\Http\Components\Panel\Posts;

use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\ImageRepository;
use App\Eloquent\Repositories\PostRepository;
use App\Eloquent\Models\Block;
use Livewire\TemporaryUploadedFile;
use Livewire\WithFileUploads;
use Livewire\Component;

class Form extends Component
{
    use WithFileUploads;

    public Post $entity;

    public TemporaryUploadedFile|string|null $imageUpload = null;

    protected PostRepository $postRepository;
    protected CategoryRepository $categoryRepository;
    protected ImageRepository $imageRepository;

    public function mount(Post $entity)
    {
        $this->entity = $entity;
    }

    public function boot(PostRepository $postRepository, CategoryRepository $categoryRepository, ImageRepository $imageRepository)
    {
        $this->postRepository = $postRepository;
        $this->categoryRepository = $categoryRepository;
        $this->imageRepository = $imageRepository;
    }

    public function render()
    {
        $categoriesSelect = $this->categoryRepository->select();

        return view('components.panel.posts.form', ['categoriesSelect' => $categoriesSelect]);
    }

    public function submit()
    {
        $this->validate();
        dd($this->entity);
        return;


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

    public function addTextBlock()
    {
        $this->entity->blocks->add(new Block());
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
            'entity.title' => $this->entity->getValidationRules()['title'],
            'entity.slug' => $this->entity->getValidationRules()['slug'],
            'entity.description' => $this->entity->getValidationRules()['description'],
            'entity.status' => $this->entity->getValidationRules()['status'],
        ];
    }
}
