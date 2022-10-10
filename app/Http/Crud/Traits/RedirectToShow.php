<?php

namespace App\Http\Crud\Traits;

use Illuminate\Http\Exceptions\HttpResponseException;

trait RedirectToShow
{
    public function afterUpdate($entity, $fieldValues)
    {
        $this->redirectToShow($entity);
    }

    public function afterStore($entity, $fieldValues)
    {
        $this->redirectToShow($entity);
    }

    protected function redirectToShow($entity)
    {
        if (auth()->user()->can($this->getRouteByMethod('show'))) {
            throw new HttpResponseException(redirect()->route($this->getRouteByMethod('show'), $entity)
                ->with('flash_success', trans('crud.updated')));
        }
    }
}
