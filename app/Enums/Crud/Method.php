<?php

namespace App\Enums\Crud;

enum Method: string
{
    case INDEX = 'index';
    case CREATE = 'create';
    case SHOW = 'show';
    case STORE = 'store';
    case EDIT = 'edit';
    case UPDATE = 'update';
    case DESTROY = 'destroy';
}
