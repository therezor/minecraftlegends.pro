<?php

namespace App\Forms\Panel\Role;

use App\Eloquent\Repositories\Criteria\FilterCriteria;
use App\Enums\Role\Permission;
use App\Forms\BaseFilterForm;
use Illuminate\Database\Eloquent\Builder;

class FilterForm extends BaseFilterForm
{
    public function buildForm()
    {
        $this->add('name', 'text');
        $this->add('permissions', 'choice', [
            'choices'  => ['' => ''] + Permission::select(),
        ]);
    }

    public function getFilterCriteria(): FilterCriteria
    {
        $criteria = parent::getFilterCriteria();

        $criteria->whereLike('name')
            ->callback('permissions', function (Builder $query, $value) {
                return $query->whereJsonContains('permissions', $value);
            });

        return $criteria;
    }
}
