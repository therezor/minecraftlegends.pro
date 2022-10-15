<?php

namespace App\Http\Components\Panel\Posts;

use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\ImageRepository;
use App\Eloquent\Repositories\PostRepository;
use App\Eloquent\Models\Block;
use App\Eloquent\Transformers\BlockTransformer;
use App\Eloquent\Transformers\PostTransformer;
use App\Enums\Block\Type;
use Livewire\Component;
use App\Http\Components\Traits\WithImageUploads;

class Form extends Component
{
    use WithImageUploads;

    public array $post = [];
    public int $counter = 0;
    public Post $entity;

    protected PostRepository $postRepository;
    protected CategoryRepository $categoryRepository;

    public function boot(PostRepository $postRepository, CategoryRepository $categoryRepository, ImageRepository $imageRepository)
    {
        $this->postRepository = $postRepository;
        $this->categoryRepository = $categoryRepository;
        $this->imageRepository = $imageRepository;
    }

    public function mount()
    {
        $this->post = (new PostTransformer($this->entity))->toArray();

        $this->post['blocks'][] = (new BlockTransformer(new Block(['type' => Type::TEXT])))->toArray();
    }

    public function render()
    {
        $categoriesSelect = $this->categoryRepository->select();

        return view('components.panel.posts.form', ['categoriesSelect' => $categoriesSelect]);
    }

    public function submit()
    {
        $this->validate();
        dd($this->post);
        return;


        $this->itemId
            ? $this->update($attributes)
            : $this->create($attributes);

        return redirect()->route($this->routePrefix . '.index');
    }

    public function addBlock(string $type)
    {
        $this->post['blocks'][] = (new BlockTransformer(new Block(['type' => $type])))->toArray();
    }

    public function moveBlockUp(int $key)
    {
        if (!isset($this->post['blocks'][$key - 1])) {
            return;
        }
        $buffer = $this->post['blocks'][$key];
        $this->post['blocks'][$key] = $this->post['blocks'][$key - 1];
        $this->post['blocks'][$key - 1] = $buffer;
    }

    public function moveBlockDown(int $key)
    {
        if (!isset($this->post['blocks'][$key + 1])) {
            return;
        }
        $buffer = $this->post['blocks'][$key];
        $this->post['blocks'][$key] = $this->post['blocks'][$key + 1];
        $this->post['blocks'][$key + 1] = $buffer;
    }

    public function removeBlock(int $key)
    {
        unset($this->post['blocks'][$key]);
    }

    protected function rules(): array
    {

        return [
            'post.title' => $this->entity->getValidationRules()['title'],
            'post.slug' => $this->entity->getValidationRules()['slug'],
            'post.description' => $this->entity->getValidationRules()['description'],
            'post.status' => $this->entity->getValidationRules()['status'],
            'post.image_id' => $this->entity->getValidationRules()['image_id'],

            'post.blocks.*.title' => [],
            'post.blocks.*.description' => [],
            'post.blocks.*.data' => [],
        ];
    }
}
