<?php

namespace App\Eloquent\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface Repository extends RepositoryCriteria
{
    public function get(): Collection;

    public function first(): ?Model;

    /**
     * @param array<int, string> $columns
     */
    public function paginate(int $perPage = 10, array $columns = ['*'], string $pageName = 'page', int $page = null): LengthAwarePaginator;

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): Model;

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(int $id, array $attributes): Model;

    public function delete(int $id): bool;

    public function find(int $id): ?Model;

    public function findOrFail(int $id): Model;

    public function findBy(string $field, mixed $value): ?Model;

    public function findByOrFail(string $field, mixed $value): Model;

    public function newModel(): Model;
}
