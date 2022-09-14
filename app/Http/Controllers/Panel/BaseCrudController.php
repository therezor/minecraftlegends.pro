<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

abstract class BaseCrudController extends Controller
{
    abstract protected function crudName(): string;

    protected function routePrefix(): string
    {
        $current = Route::current()->getName();

        return substr($current, 0, strrpos($current, '.'));
    }

    public function index()
    {
        return view('panel.crud.index', ['crudName' => $this->crudName(), 'routePrefix' => $this->routePrefix()]);
    }

    public function create()
    {
        return view('panel.crud.create', ['crudName' => $this->crudName(), 'routePrefix' => $this->routePrefix()]);
    }

    public function edit($id)
    {
        return view('panel.crud.update', ['crudName' => $this->crudName(), 'routePrefix' => $this->routePrefix(), 'id' => $id]);
    }
}
