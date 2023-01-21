<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Models\Page;
use App\Enums\Content\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PageRepository extends BaseRepository
{
    public function modelClass(): string
    {
        return Page::class;
    }

    public function create(array $attributes): Model
    {
        return DB::transaction(function () use ($attributes) {
            /** @var Page $page */
            $page = parent::create($attributes);

            $this->syncImages($page);

            return $page;
        });
    }

    public function update(string $id, array $attributes): Model
    {
        return DB::transaction(function () use ($id, $attributes) {
            /** @var Page $page */
            $page = parent::update($id, $attributes);

            $this->syncImages($page);

            return $page;
        });
    }

    protected function syncImages(Page $page)
    {
        $content = $page->content;
        if (!$content) {
            return;
        }

        $imageIds = $page->content->blocks()->where('type', Type::IMAGE->value)->pluck('data.file.id');
        $page->images()->sync($imageIds);
    }
}
