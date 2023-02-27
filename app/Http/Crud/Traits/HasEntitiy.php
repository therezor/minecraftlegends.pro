<?php

namespace App\Http\Crud\Traits;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

trait HasEntitiy
{
    public function emptyEntity(): Model
    {
        return $this->getRepository()->newModel();
    }

    public function findEntity(array $params): Model
    {
        $id = end($params);

        return $this->getRepository()->findOrFail($id);
    }

    public function createEntity(array $fieldValues): Model
    {
        return $this->getRepository()->create($fieldValues);
    }

    public function updateEntity(Model $entity, array $fieldValues): Model
    {
        return $this->getRepository()->update($entity->id, $fieldValues);
    }

    public function deleteEntity(Model $entity): bool
    {
        return $this->getRepository()->delete($entity->id);
    }

    public function listEntities(): LengthAwarePaginator
    {
        return $this->getRepository()->paginate($this->perPage);
    }
}
