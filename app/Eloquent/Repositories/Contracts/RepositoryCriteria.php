<?php

namespace App\Eloquent\Repositories\Contracts;

use Illuminate\Support\Collection;

interface RepositoryCriteria
{
    /**
     * Push Criteria for filter the query
     *
     * @param Criteria $criteria
     *
     * @return $this
     */
    public function pushCriteria(Criteria $criteria);

    /**
     * Prepend Criteria
     *
     * @param Criteria $criteria
     *
     * @return $this
     */
    public function prependCriteria(Criteria $criteria);

    /**
     * Pop Criteria
     *
     * @param Criteria|string $criteria
     *
     * @return $this
     */
    public function popCriteria(Criteria|string $criteria);

    /**
     * Get Collection of Criteria
     *
     * @return Collection
     */
    public function getCriteria(): Collection;

    /**
     * Skip Criteria
     *
     * @param bool $status
     *
     * @return $this
     */
    public function skipCriteria(bool $status = true);

    /**
     * Reset all criteria
     *
     * @return $this
     */
    public function resetCriteria();
}
