<?php

namespace App\Forms\Panel\Blog\Category;

use App\Eloquent\Repositories\Criteria\FilterCriteria;
use App\Forms\BaseFilterForm;

class FilterForm extends BaseFilterForm
{
    public function buildForm()
    {
        $this->add('name', 'text');
    }

    public function getFilterCriteria(): FilterCriteria
    {
        $criteria = parent::getFilterCriteria();

        $criteria->whereLike('name');

        return $criteria;
    }
}
