<?php

namespace App\Forms\Panel\User;

use App\Eloquent\Repositories\Criteria\FilterCriteria;
use App\Eloquent\Repositories\RoleRepository;
use App\Forms\BaseFilterForm;

class FilterForm extends BaseFilterForm
{
    private RoleRepository $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function buildForm()
    {
        $this->add('name', 'text');
        $this->add('email', 'text');
        $this->add('role_id', 'choice', [
            'choices'  => ['' => ''] + $this->roleRepository->select(),
        ]);
    }

    public function getFilterCriteria(): FilterCriteria
    {
        $criteria = parent::getFilterCriteria();

        $criteria->whereLike('name')
            ->whereLike('email');

        return $criteria;
    }
}
