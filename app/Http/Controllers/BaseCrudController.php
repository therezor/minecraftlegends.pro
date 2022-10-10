<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Fields\Collections\FieldCollection;
use App\Forms\FilterForm;
use App\Http\Crud\BaseCrud;
use Kris\LaravelFormBuilder\Facades\FormBuilder;

abstract class BaseCrudController extends Controller
{
    protected BaseCrud $crud;

    public function index(Request $request)
    {
        $fields = $this->crud->getListFields();

        $sortFields = (new FieldCollection($fields))->onlySortable();

        $this->crud->getRepository()->pushCriteria($this->crud->getSortCriteria($sortFields, $request));

        $emptyEntity = $this->crud->getRepository()->newModel();

        $filterForm = $this->crud->getFilterFormClass();

        if ($filterForm) {
            /** @var FilterForm $filterForm */
            $filterForm = FormBuilder::create($filterForm, [
                'model' => $emptyEntity,
            ]);

            $this->crud->getRepository()->pushCriteria($filterForm->getFilterCriteria());
        }

        $entities = $this->crud->getRepository()->paginate($this->crud->perPage);

        return view($this->crud->getViewByMethod('index'))
            ->with('crud', $this->crud)
            ->with('fields', $fields)
            ->with('emptyEntity', $emptyEntity)
            ->with('filterForm', $filterForm)
            ->with('entities', $entities);
    }

    public function create()
    {
        $entity = $this->crud->getRepository()->newModel();

        $form = $this->crud->getCreateFormClass();

        if ($form) {
            $form = FormBuilder::create($form, [
                'method' => 'post',
                'model'  => $entity,
                'route'  => $this->crud->getRouteByMethod('store'),
            ]);
        }

        return view($this->crud->getViewByMethod('create'))
            ->with('entity', $entity)
            ->with('form', $form)
            ->with('crud', $this->crud);
    }

    public function store()
    {
        $entity = $this->crud->getRepository()->newModel();

        $form = $this->crud->getCreateFormClass();

        if ($form) {
            $form = FormBuilder::create($form, [
                'method' => 'post',
                'model'  => $entity,
                'route'  => $this->crud->getRouteByMethod('store'),
            ]);

            $form->redirectIfNotValid();

            $fieldValues = $form->getFieldValues(true);

            $this->crud->beforeStore($entity, $fieldValues);

            $entity = $this->crud->getRepository()->create($fieldValues);

            $this->crud->afterStore($entity, $fieldValues);
        }

        return redirect()->route($this->crud->getRouteByMethod('index'))
            ->with('flash_success', trans('crud.created'));
    }

    public function show($id)
    {
        $entity = $this->crud->getRepository()->findOrFail($id);

        $fields = $this->crud->getShowFields();

        return view($this->crud->getViewByMethod('show'))
            ->with('entity', $entity)
            ->with('fields', $fields)
            ->with('crud', $this->crud);
    }

    public function edit($id)
    {
        $entity = $this->crud->getRepository()->findOrFail($id);

        $form = $this->crud->getEditFormClass();

        if ($form) {
            $form = FormBuilder::create($form, [
                'method' => 'patch',
                'model'  => $entity,
                'route'  => [$this->crud->getRouteByMethod('update'), $id],
            ]);
        }

        return view($this->crud->getViewByMethod('edit'))
            ->with('entity', $entity)
            ->with('form', $form)
            ->with('crud', $this->crud);
    }

    public function update($id)
    {
        $entity = $this->crud->getRepository()->findOrFail($id);

        $form = $this->crud->getEditFormClass();

        if ($form) {
            $form = FormBuilder::create($form, [
                'method' => 'patch',
                'model'  => $entity,
                'route'  => $this->crud->getRouteByMethod('update'),
            ]);

            $form->redirectIfNotValid();

            $fieldValues = $form->getFieldValues(true);

            $this->crud->beforeUpdate($entity, $fieldValues);

            $entity = $this->crud->getRepository()->update($id, $fieldValues);

            $this->crud->afterUpdate($entity, $fieldValues);
        }

        return redirect()->route($this->crud->getRouteByMethod('index'))
            ->with('flash_success', trans('crud.updated'));
    }

    public function destroy($id)
    {
        $entity = $this->crud->getRepository()->findOrFail($id);

        $this->crud->beforeDestroy($entity);

        $this->crud->getRepository()->delete($id);

        $this->crud->afterDestroy($entity);

        return redirect()->route($this->crud->getRouteByMethod('index'))
            ->with('flash_success', trans('crud.deleted'));
    }
}
