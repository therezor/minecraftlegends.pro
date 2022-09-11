<?php

namespace App\Eloquent\Repositories\Traits;

use Illuminate\Support\Collection;
use App\Eloquent\Repositories\Contracts\Criteria;

trait HasCriteria
{
    /**
     * @var Collection
     */
    protected Collection $criteria;

    /** @var bool */
    protected bool $skipCriteria = false;

    /**
     * @param Criteria $criteria
     *
     * @return $this
     */
    public function prependCriteria(Criteria $criteria): self
    {
        $this->criteria->prepend($criteria, spl_object_hash($criteria));

        return $this;
    }

    /**
     * @param Criteria $criteria
     *
     * @return $this
     */
    public function pushCriteria(Criteria $criteria): self
    {
        $this->criteria[spl_object_hash($criteria)] = $criteria;

        return $this;
    }

    /**
     * @param Criteria $criteria
     *
     * @return $this
     */
    public function pushOnceCriteria(Criteria $criteria): self
    {
        $isNotExists = $this->criteria->filter(function ($item) use ($criteria) {
            /** @var Criteria $item */
            return get_class($item) === get_class($criteria);
        })->isEmpty();

        if ($isNotExists) {
            $this->criteria->push($criteria);
        }

        return $this;
    }

    /**
     * @param Criteria|string $criteria
     *
     * @return $this
     */
    public function popCriteria(Criteria|string $criteria): self
    {
        $this->criteria = $this->criteria->reject(function ($item) use ($criteria) {
            /** @var Criteria $item */
            if (is_string($criteria)) {
                return get_class($item) === $criteria;
            }

            return get_class($item) === get_class($criteria);
        });

        return $this;
    }

    public function getCriteria(): Collection
    {
        return $this->criteria;
    }

    /**
     * @param bool $status
     *
     * @return $this
     */
    public function skipCriteria(bool $status = true): self
    {
        $this->skipCriteria = $status;

        return $this;
    }

    /**
     * @return $this
     */
    public function resetCriteria(): self
    {
        $this->criteria = new Collection();

        return $this;
    }
}
