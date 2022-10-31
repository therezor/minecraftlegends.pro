<?php

namespace App\Http\Components\Panel\Posts;

use App\Eloquent\Models\Image;
use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\ImageRepository;
use App\Eloquent\Repositories\PostRepository;
use App\Eloquent\Models\Block;
use App\Eloquent\Transformers\BlockTransformer;
use App\Eloquent\Transformers\PostTransformer;
use App\Enums\Block\Type;
use Embed\Embed;
use Illuminate\Validation\Rule;
use Livewire\Component;
use App\Http\Components\Traits\WithImageUploads;
use Livewire\Exceptions\CannotBindToModelDataWithoutValidationRuleException;

class Form extends Component
{
    use WithImageUploads;

    public array $post = [];

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

    public function mount(Post $entity)
    {
        $this->post = (new PostTransformer($entity))->toArray();
    }

    public function render()
    {
        $categoriesSelect =  ['' => ''] + $this->categoryRepository->select();

        $range = range(1, 10);
        $perPageSelect = ['' => trans('crud.all')] + array_combine($range, $range);

        return view('components.panel.posts.form', [
            'categoriesSelect' => $categoriesSelect,
            'perPageSelect' => $perPageSelect,
        ]);
    }

    public function submit()
    {
        $this->validate();

        if (empty($this->post['id'])) {
            $this->postRepository->create($this->post);

            return redirect()->route('panel.posts.index');
        }

        $this->postRepository->update($this->post['id'], $this->post);

        return redirect()->route('panel.posts.index');
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

            $this->post['blocks'][$key]['title'] = (string)$embedCode->title;
            $this->post['blocks'][$key]['data']['embed_code'] = (string)$embedCode->code;
        } catch (\Throwable $e) {
            $this->post['blocks'][$key]['data']['video_url'] = null;

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
        /** @var Post $model */
        $model = empty($this->post['id'])
            ? $this->postRepository->newModel()
            : $this->postRepository->find($this->post['id']);

        $rules = $model->getValidationRules();

        return [
            'post.title' => $rules['title'],
            'post.slug' => $rules['slug'],
            'post.description' => $rules['description'],
            'post.status' => $rules['status'],
            'post.featured' => $rules['featured'],
            'post.image_id' => $rules['image_id'],
            'post.per_page' => $rules['per_page'],
            'post.category_id' => $rules['category_id'],

            'post.blocks.*.title' => [
                'required_if:post.blocks.*.type,' . Type::TEXT->value,
                'required_if:post.blocks.*.type,' . Type::LIST->value,
                'nullable',
                'string',
                'max:255',
            ],
            'post.blocks.*.description' => [
                'required_if:post.blocks.*.type,' . Type::TEXT->value,
                'nullable',
                'string',
                'max:65000',
            ],
            'post.blocks.*.data' => [
                'nullable',
                'array',
            ],
            'post.blocks.*.data.counter' => [
                'required_if:post.blocks.*.type,' . Type::LIST->value,
                'nullable',
                'int',
                'min:1',
                'max:512',
            ],
            'post.blocks.*.image_id' => [
                'required_if:post.blocks.*.type,' . Type::IMAGE->value,
                'nullable',
                Rule::exists(Image::class, 'id'),
            ],
            'post.blocks.*.data.alt' => [
                'nullable',
                'string',
                'max:255',
            ],
            'post.blocks.*.data.caption' => [
                'nullable',
                'string',
                'max:255',
            ],
            'post.blocks.*.data.video_url' => [
                'required_if:post.blocks.*.type,' . Type::VIDEO->value,
                'nullable',
                'url',
            ],
        ];
    }

    public function syncInput($name, $value, $rehash = true)
    {
        throw_if(
            $this->missingRuleFor($name),
            new CannotBindToModelDataWithoutValidationRuleException($name, $this::getName())
        );

        parent::syncInput($name, $value, $rehash);
    }
}
