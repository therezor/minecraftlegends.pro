<?php

namespace App\Http\Crud\Traits;

use App\Enums\Crud\Method;
use Illuminate\Http\Request;
use App\Fields\Collections\FieldCollection;
use App\Eloquent\Repositories\Contracts\Criteria;

trait HasCriteria
{
    public function getDefaultCriteria(Method $method): array
    {
        return [];
    }

    public function applySortCriteria(FieldCollection $fields, Request $request): static
    {
        $this->getRepository()->pushOnceCriteria($this->getSortCriteria($fields, $request));

        return $this;
    }

    public function applyCriteria(Criteria $criteria): static
    {
        $this->getRepository()->pushOnceCriteria($criteria);

        return $this;
    }

    public function applyDefaultCriteria(Method $method): static
    {
        foreach ($this->getDefaultCriteria($method) as $criteria) {
            $this->getRepository()->pushCriteria($criteria);
        }

        return $this;
    }
}
