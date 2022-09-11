<?php

namespace App\Eloquent\Repositories\Contracts;

interface SortableCriteria extends Criteria
{
    /**
     * Apply criteria to query in repository
     *
     * @param $direction
     * @return $this
     */
    public function setDirection(string $direction);
}
