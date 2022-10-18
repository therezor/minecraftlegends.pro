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
use Embed\Embed;
use Illuminate\Validation\Rules\Enum;
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
    protected Embed $embed;

    public function boot(
        PostRepository $postRepository,
        CategoryRepository $categoryRepository,
        ImageRepository $imageRepository,
        Embed $embed
    ) {
        $this->postRepository = $postRepository;
        $this->categoryRepository = $categoryRepository;
        $this->imageRepository = $imageRepository;
        $this->embed = $embed;
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

    public function uploadVideo(int $key)
    {
        if (empty($this->post['blocks'][$key])) {
            return;
        }

        try {
            $embedCode = $this->embed->get($this->post['blocks'][$key]['data']['video_url'] ?? '');

            $this->post['blocks'][$key]['title'] = (string) $embedCode->title;
            $this->post['blocks'][$key]['data']['embed_code'] = (string) $embedCode->code;
        } catch (\Throwable $e) {
            return;
        }
    }

    public function removeVideo(int $key)
    {
        unset($this->post['blocks'][$key]['data']['video_url']);
        unset($this->post['blocks'][$key]['data']['embed_code']);
    }

    protected function rules(): array
    {
        return [
            'post.title' => $this->entity->getValidationRules()['title'],
            'post.slug' => $this->entity->getValidationRules()['slug'],
            'post.description' => $this->entity->getValidationRules()['description'],
            'post.status' => $this->entity->getValidationRules()['status'],
            'post.image_id' => $this->entity->getValidationRules()['image_id'],

            'post.blocks.*.type' => [
                'required',
                new Enum(Type::class),
            ],
            'post.blocks.*.title' => [
                'required_if:post.blocks.*.type,' . Type::TEXT->value,
                'required_if:post.blocks.*.type,' . Type::LIST->value,
                'nullable',
                'string',
                'max:255',
            ],
            'post.blocks.*.description' =>  [
                'required_if:post.blocks.*.type,' . Type::TEXT->value,
                'nullable',
                'string',
                'max:65000',
            ],
            'post.blocks.*.data' => [
                'nullable',
                'array'
            ],
            'post.blocks.*.data.counter' => [
                'required_if:post.blocks.*.type,' . Type::LIST->value,
                'nullable',
                'int',
                'min:1',
                'max:512',
            ],
            'post.blocks.*.data.url' => [
                'required_if:post.blocks.*.type,' . Type::VIDEO->value,
                'nullable',
                'video_url'
            ],
        ];
    }
}
