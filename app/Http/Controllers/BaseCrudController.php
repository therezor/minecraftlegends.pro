<?php

namespace App\Http\Controllers;

use App\Enums\Crud\Method;
use App\Fields\Collections\FieldCollection;
use App\Forms\BaseFilterForm;
use App\Http\Crud\BaseCrud;
use Illuminate\Http\Request;
use Kris\LaravelFormBuilder\Facades\FormBuilder;
use Kris\LaravelFormBuilder\Form;

abstract class BaseCrudController extends Controller
{
    protected BaseCrud $crud;

    public function index(Request $request, ...$params)
    {
        $this->crud->applyDefaultCriteria(Method::INDEX);

        $this->seo()->setTitle($this->crud->title());

        $fields = $this->crud->getListFields();

        $sortFields = (new FieldCollection($fields))->onlySortable();
        $this->crud->applySortCriteria($sortFields, $request);

        $emptyEntity = $this->crud->emptyEntity();

        $filterFormClass = $this->crud->getFilterFormClass();
        $filterForm = null;

        if ($filterFormClass) {
            /** @var BaseFilterForm $filterForm */
            $filterForm = FormBuilder::create($filterFormClass, [
                'model' => $emptyEntity,
            ]);

            $this->crud->applyCriteria($filterForm->getFilterCriteria());
        }

        $entities = $this->crud->listEntities();

        return view($this->crud->getViewByMethod(Method::INDEX), [
            'params' => $params,
            'crud' => $this->crud,
            'fields' => $fields,
            'emptyEntity' => $emptyEntity,
            'filterForm' => $filterForm,
            'entities' => $entities,
        ]);
    }

    public function create(...$params)
    {
        $this->crud->applyDefaultCriteria(Method::CREATE);

        $this->seo()->setTitle($this->crud->title());

        $entity = $this->crud->emptyEntity();

        $formClass = $this->crud->getCreateFormClass();
        $form = null;

        if ($formClass) {
            /** @var Form $form */
            $form = FormBuilder::create($formClass, [
                'method' => 'post',
                'model' => $entity,
                'route' => [$this->crud->getRouteByMethod(Method::STORE), $params],
            ]);
        }

        return view($this->crud->getViewByMethod(Method::CREATE), [
            'params' => $params,
            'crud' => $this->crud,
            'form' => $form,
            'entity' => $entity,
        ]);
    }

    public function store(...$params)
    {
        $this->crud->applyDefaultCriteria(Method::STORE);

        $entity = $this->crud->emptyEntity();

        $formClass = $this->crud->getCreateFormClass();

        if ($formClass) {
            /** @var Form $form */
            $form = FormBuilder::create($formClass, [
                'method' => 'post',
                'model' => $entity,
                'route' => [$this->crud->getRouteByMethod(Method::STORE), $params],
            ]);

            $form->redirectIfNotValid();

            $fieldValues = $form->getFieldValues(true);

            $this->crud->beforeStore($entity, $fieldValues);

            $entity = $this->crud->createEntity($fieldValues);

            $this->crud->afterStore($entity, $fieldValues);
        }

        return redirect()->route($this->crud->getRouteByMethod(Method::INDEX), $params)
            ->with('status', trans('crud.created'));
    }

    public function show(...$params)
    {
        $this->crud->applyDefaultCriteria(Method::SHOW);

        $this->seo()->setTitle($this->crud->title());

        $entity = $this->crud->findEntity($params);

        $fields = $this->crud->getShowFields();

        return view($this->crud->getViewByMethod(Method::SHOW), [
            'params' => $params,
            'crud' => $this->crud,
            'fields' => $fields,
            'entity' => $entity,
        ]);
    }

    public function edit(...$params)
    {
        $this->crud->applyDefaultCriteria(Method::EDIT);

        $this->seo()->setTitle($this->crud->title());

        $entity = $this->crud->findEntity($params);

        $formClass = $this->crud->getEditFormClass();
        $form = null;

        if ($formClass) {
            /** @var Form $form */
            $form = FormBuilder::create($formClass, [
                'method' => 'patch',
                'model' => $entity,
                'route' => [$this->crud->getRouteByMethod(Method::UPDATE), $params],
            ]);
        }

        return view($this->crud->getViewByMethod(Method::EDIT), [
            'params' => $params,
            'crud' => $this->crud,
            'form' => $form,
            'entity' => $entity,
        ]);
    }

    public function update(...$params)
    {
        $this->crud->applyDefaultCriteria(Method::UPDATE);

        $entity = $this->crud->findEntity($params);

        $formClass = $this->crud->getEditFormClass();

        if ($formClass) {
            /** @var Form $form */
            $form = FormBuilder::create($formClass, [
                'method' => 'patch',
                'model' => $entity,
                'route' => [$this->crud->getRouteByMethod(Method::UPDATE), $params],
            ]);

            $form->redirectIfNotValid();

            $fieldValues = $form->getFieldValues(true);

            $this->crud->beforeUpdate($entity, $fieldValues);

            $entity = $this->crud->updateEntity($entity, $fieldValues);

            $this->crud->afterUpdate($entity, $fieldValues);
        }

        return redirect()->route($this->crud->getRouteByMethod(Method::INDEX), $params)
            ->with('status', trans('crud.updated'));
    }

    public function destroy(...$params)
    {
        $this->crud->applyDefaultCriteria(Method::DESTROY);

        $entity = $this->crud->findEntity($params);

        $this->crud->beforeDestroy($entity);

        $this->crud->deleteEntity($entity);

        $this->crud->afterDestroy($entity);

        return redirect()->route($this->crud->getRouteByMethod(Method::INDEX), $params)
            ->with('status', trans('crud.deleted'));
    }
}
