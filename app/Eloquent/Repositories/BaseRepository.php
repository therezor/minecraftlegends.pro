<?php

namespace App\Eloquent\Repositories;

use App\Eloquent\Repositories\Contracts\Criteria;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use App\Eloquent\Repositories\Contracts\Repository as RepositoryContract;
use App\Eloquent\Repositories\Traits\HasCriteria;
use Illuminate\Support\LazyCollection;

abstract class BaseRepository implements RepositoryContract
{
    use HasCriteria;

    protected Model $model;

    /**
     * Specify Model class name
     *
     * @return string
     */
    abstract public function modelClass(): string;

    /**
     * new Model instance
     *
     * @return model
     */
    protected function model(): Model
    {
        return $this->model;
    }

    public function __construct(Container $container)
    {
        $this->resetCriteria();
        /** @var Model $model */
        $model = $container->make($this->modelClass());
        $this->model = $model;
    }

    public function get(): Collection
    {
        return $this->newQuery()->get();
    }

    public function first(): ?Model
    {
        return $this->newQuery()->first();
    }

    /**
     * @inheritdoc
     */
    public function paginate(int $perPage = 10, array $columns = ['*'], string $pageName = 'page', int $page = null): LengthAwarePaginator
    {
        return $this->newQuery()->paginate($perPage, $columns, $pageName, $page);
    }

    /**
     * @inheritdoc
     */
    public function create(array $attributes): Model
    {
        $model = $this->model()->newInstance($attributes);
        $model->save();

        return $model;
    }

    /**
     * @inheritdoc
     */
    public function update(string $id, array $attributes): Model
    {
        $model = $this->findOrFail($id);
        $model->fill($attributes);
        $model->save();

        return $model;
    }

    /**
     * @param array<string, mixed> $attributes
     * @param array<string, mixed> $values
     */
    public function updateOrCreate(array $attributes, array $values = []): Model
    {
        return $this->newQuery()->updateOrCreate($attributes, $values);
    }

    public function delete(string $id): bool
    {
        $model = $this->findOrFail($id);

        return (bool) $model->delete();
    }

    public function find(string $id): ?Model
    {
        return $this->newQuery()->find($id);
    }

    public function findOrFail(string $id): Model
    {
        return $this->newQuery()->findOrFail($id);
    }

    public function findBy(string $field, mixed $value): ?Model
    {
        return $this->newQuery()->where($field, '=', $value)->first();
    }

    public function findByOrFail(string $field, mixed $value): Model
    {
        return $this->newQuery()->where($field, '=', $value)->firstOrFail();
    }

    public function sum(string $column): mixed
    {
        return $this->newQuery()->sum($column);
    }

    public function count(): int
    {
        return $this->newQuery()->count();
    }

    public function cursor(): LazyCollection
    {
        return $this->newQuery()->cursor();
    }

    public function newModel(): Model
    {
        return $this->model()->newInstance();
    }

    protected function newQuery(): Builder
    {
        $query = $this->model()->newQuery();

        if (true === $this->skipCriteria) {
            return $query;
        }

        $criteria = $this->getCriteria();
        /** @var Criteria $c */
        foreach ($criteria as $c) {
            $query = $c->apply($query, $this);
        }

        return $query;
    }
}
