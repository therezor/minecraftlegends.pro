<?php

namespace App\Forms\Panel\User;

use App\Eloquent\Repositories\RoleRepository;
use App\Forms\BaseForm;

class Form extends BaseForm
{
    private RoleRepository $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function buildForm()
    {
        $this->add('name', 'text');
        $this->add('email', 'email');
        $this->add('role_id', 'choice', [
            'choices'     => $this->roleRepository->select(),
            'empty_value' => ' ',
        ]);
        $this->add('password', 'password', ['value' => '']);
    }
}
