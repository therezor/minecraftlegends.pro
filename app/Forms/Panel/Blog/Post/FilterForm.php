<?php

namespace App\Forms\Panel\Blog\Post;

use App\Eloquent\Repositories\RoleRepository;
use App\Eloquent\Repositories\Criteria\FilterCriteria;
use App\Enums\Post\Featured;
use App\Enums\Post\Status;
use App\Forms\BaseFilterForm;

class FilterForm extends BaseFilterForm
{
    public function buildForm()
    {
        $this->add('title', 'text');
        $this->add('description', 'text');
        $this->add('status', 'choice', [
            'choices'  => ['' => ''] + Status::select(),
        ]);
        $this->add('featured', 'choice', [
            'choices'  => ['' => ''] + Featured::select(),
        ]);
    }

    public function getFilterCriteria(): FilterCriteria
    {
        $criteria = parent::getFilterCriteria();

        $criteria->whereLike('title')
            ->whereLike('description');

        return $criteria;
    }
}
