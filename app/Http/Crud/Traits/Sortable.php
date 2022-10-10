<?php

namespace App\Http\Crud\Traits;

use Illuminate\Http\Request;
use App\Fields\Collections\FieldCollection;
use App\Eloquent\Repositories\Contracts\Criteria;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;

trait Sortable
{
    /**
     * Default column for sorting
     *
     * @var string
     */
    public $defaultSortColumn = 'id';

    /**
     * Default direction for sorting
     *
     * @var string
     */
    public $defaultSortDirection = 'desc';

    public function getSortCriteria(FieldCollection $fields, Request $request): Criteria
    {
        $field = $this->getActiveSortField($fields, $request);

        if ($field) {
            return $field->getSortableCriteria();
        }

        return new OrderByCriteria($this->defaultSortColumn, $this->defaultSortDirection);
    }

    public function getActiveSortField(FieldCollection $fields, Request $request)
    {
        if ($fields->isNotEmpty()) {
            $sortName = $request->get('sort', $this->defaultSortColumn);

            $field = $fields->firstByName($sortName);

            if ($field) {
                $field->setSortDirection($this->getSortDirection($request));

                return $field;
            }
        }

        return null;
    }

    public function getSortDirection(Request $request)
    {
        $direction = $request->get('direction');

        if (!in_array($direction, ['asc', 'desc'], true)) {
            return $this->defaultSortDirection;
        }

        return $direction;
    }
}
