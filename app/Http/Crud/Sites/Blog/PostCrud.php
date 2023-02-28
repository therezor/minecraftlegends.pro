<?php

namespace App\Http\Crud\Sites\Blog;

use App\Eloquent\Models\Site\Site;
use App\Eloquent\Repositories\ImageRepository;
use App\Eloquent\Repositories\Site\Blog\PostRepository;
use App\Enums\Crud\Method;
use App\Forms\Sites\Blog\Post\{Form, FilterForm};
use App\Http\Crud\Traits\RedirectToShow;
use App\Fields\{ActionName, Actions, DateTime, Enum};
use App\Http\Crud\BaseCrud;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PostCrud extends BaseCrud
{
    use RedirectToShow;

    protected ImageRepository $imageRepository;

    public function __construct(PostRepository $repository, ImageRepository $imageRepository)
    {
        $this->repository = $repository;
        $this->imageRepository = $imageRepository;
    }

    public function title(): string
    {
        return trans('sites.blog.posts.title');
    }

    public function getRouteName(): string
    {
        return 'sites.blog-posts';
    }

    public function layout(): string
    {
        return 'layouts.sites';
    }

    public function getListFields(): array
    {
        return [
            ActionName::make('title', $this->getRouteName())->sortable()->limit(45),
            Enum::make('status')->sortable()->meta('d-none d-md-table-cell', 'list.class'),
            Enum::make('featured')->sortable()->meta('d-none d-md-table-cell', 'list.class'),
            DateTime::make('updated_at')->meta('d-none d-md-table-cell', 'list.class'),
            Actions::make('id', $this->getRouteName()),
        ];
    }

    public function getFilterFormClass(): ?string
    {
        return FilterForm::class;
    }

    public function getCreateFormClass(): ?string
    {
        return Form::class;
    }

    public function getViewByMethod(Method $method): string
    {
        if (Method::CREATE === $method) {
            return 'sites.blog.posts.create';
        }

        if (Method::EDIT === $method) {
            return 'sites.blog.posts.edit';
        }

        if (Method::SHOW === $method) {
            return 'sites.blog.posts.show';
        }

        return parent::getViewByMethod($method);
    }

    public function emptyEntity(): Model
    {
        /** @var Site $site */
        $site = request()->get('current_site');
        $entity = parent::emptyEntity();
        $entity->site_id = $site->id;
        $entity->setRelation('site', $site);

        return $entity;
    }

    public function beforeStore($entity, &$fieldValues)
    {
        $fieldValues['user_id'] = auth()->id();
        $fieldValues['site_id'] = request()->get('current_site')->id;
        $fieldValues['slug'] = Str::slug($fieldValues['title']);
        if (!empty($fieldValues['image'])) {
            $fieldValues['image_id'] = $this->imageRepository->upload($fieldValues['image'], auth()->user())->id;
        }
    }

    public function beforeUpdate($entity, &$fieldValues)
    {
        $fieldValues['slug'] = Str::slug($fieldValues['title']);
        if (!empty($fieldValues['image'])) {
            $fieldValues['image_id'] = $this->imageRepository->upload($fieldValues['image'], auth()->user())->id;
        }
    }
}
