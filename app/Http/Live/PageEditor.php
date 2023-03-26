<?php

namespace App\Http\Live;

use App\Eloquent\Models\Image;
use App\Eloquent\Models\Post;
use App\Eloquent\Repositories\CategoryRepository;
use App\Eloquent\Repositories\ImageRepository;
use App\Eloquent\Repositories\PostRepository;
use App\Http\Live\Traits\WithImageUploads;
use Embed\Embed;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Livewire\Component;
use Livewire\Exceptions\CannotBindToModelDataWithoutValidationRuleException;

class PageEditor extends Component
{
    use WithImageUploads;

    public array $header = [];
    public array $blocks = [];
    public array $footer = [];
    public ?int $selectedKey = null;

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

    public function mount($blocks)
    {
        $this->blocks = $blocks;
    }

    public function render()
    {
        return view('live.panel.pages.editor');
    }

    public function submit()
    {
        $this->validate();

        if (empty($this->blocks['id'])) {
            $this->postRepository->create($this->blocks);

            return redirect()->route('panel.posts.index');
        }

        $this->postRepository->update($this->blocks['id'], $this->blocks);

        return redirect()->route('panel.posts.index');
    }

    public function updateBlockOrder(array $order)
    {
        $blocks = collect($this->blocks);
        $this->blocks = collect($order)
            ->map(fn($o) => $blocks->where('id', $o['value'])->first())
            ->toArray();
    }

    public function addBlock(string $type)
    {
        $this->blocks[] = [
            'id' => Str::uuid(),
            'name' => Str::random(10),
            'is_enabled' => true,
        ];

       // session()->flash('status', trans('crud.added'));
    }

    public function toggleBlock(int $key)
    {
        if (empty($this->blocks[$key])) {
            return;
        }

        $this->blocks[$key]['is_enabled'] = !$this->blocks[$key]['is_enabled'];
    }

    public function duplicateBlock(int $key)
    {
        if (empty($this->blocks[$key])) {
            return;
        }

        $block = $this->blocks[$key];
        $block['id'] = Str::uuid();

        $this->blocks[] = $block;
    }

    public function removeBlock(int $key)
    {
       unset($this->blocks[$key]);
    }

    public function selectBlock(int $key = null)
    {
        if ($key !== null && empty($this->blocks[$key])) {
            return;
        }

        $this->selectedKey = $key;
    }

    public function removeSelection()
    {
        $this->selectedKey = null;
    }

    public function uploadVideo(int $key)
    {
        if (empty($this->blocks['blocks'][$key])) {
            return;
        }

        try {
            $embedCode = $this->embed->get($this->blocks['blocks'][$key]['data']['video_url'] ?? '');

            $this->blocks['blocks'][$key]['title'] = (string)$embedCode->title;
            $this->blocks['blocks'][$key]['data']['embed_code'] = (string)$embedCode->code;
        } catch (\Throwable $e) {
            $this->blocks['blocks'][$key]['data']['video_url'] = null;

            return;
        }
    }

    public function removeVideo(int $key)
    {
        unset($this->blocks['blocks'][$key]['data']['video_url']);
        unset($this->blocks['blocks'][$key]['data']['embed_code']);
    }

    protected function rules(): array
    {
        /** @var Post $model */
        $model = empty($this->blocks['id'])
            ? $this->postRepository->newModel()
            : $this->postRepository->find($this->blocks['id']);

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

    protected function findBlock(string $id): array
    {
        return collect($this->blocks)->where('id', $id)->first();
    }
}
