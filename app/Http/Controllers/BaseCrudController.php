<?php

namespace App\Http\Controllers;

use App\Enums\Crud\Method;
use Illuminate\Http\Request;
use App\Fields\Collections\FieldCollection;
use App\Forms\BaseFilterForm;
use App\Http\Crud\BaseCrud;
use Kris\LaravelFormBuilder\Facades\FormBuilder;
use Kris\LaravelFormBuilder\Form;

abstract class BaseCrudController extends Controller
{
    protected BaseCrud $crud;

    public function index(Request $request)
    {
        $this->seo()->setTitle($this->crud->title());

        $fields = $this->crud->getListFields();

        $sortFields = (new FieldCollection($fields))->onlySortable();

        $this->crud->getRepository()->pushCriteria($this->crud->getSortCriteria($sortFields, $request));

        $emptyEntity = $this->crud->getRepository()->newModel();

        $filterForm = $this->crud->getFilterFormClass();

        if ($filterForm) {
            /** @var BaseFilterForm $filterForm */
            $filterForm = FormBuilder::create($filterForm, [
                'model' => $emptyEntity,
            ]);

            $this->crud->getRepository()->pushCriteria($filterForm->getFilterCriteria());
        }

        $entities = $this->crud->getRepository()->paginate($this->crud->perPage);

        return view($this->crud->getViewByMethod(Method::INDEX), [
            'crud' => $this->crud,
            'fields' => $fields,
            'emptyEntity' => $emptyEntity,
            'filterForm' => $filterForm,
            'entities' => $entities,
        ]);
    }

    public function create()
    {
        $this->seo()->setTitle($this->crud->title());

        $entity = $this->crud->getRepository()->newModel();

        $formClass = $this->crud->getCreateFormClass();
        $form = null;

        if ($formClass) {
            /** @var Form $form */
            $form = FormBuilder::create($formClass, [
                'method' => 'post',
                'model' => $entity,
                'route' => $this->crud->getRouteByMethod(Method::STORE),
            ]);
        }

        return view($this->crud->getViewByMethod(Method::CREATE), [
            'crud' => $this->crud,
            'form' => $form,
            'entity' => $entity,
        ]);
    }

    public function store()
    {
        $entity = $this->crud->getRepository()->newModel();

        $formClass = $this->crud->getCreateFormClass();

        if ($formClass) {
            /** @var Form $form */
            $form = FormBuilder::create($formClass, [
                'method' => 'post',
                'model' => $entity,
                'route' => $this->crud->getRouteByMethod(Method::STORE),
            ]);

            $form->redirectIfNotValid();

            $fieldValues = $form->getFieldValues(true);

            $this->crud->beforeStore($entity, $fieldValues);

            $entity = $this->crud->getRepository()->create($fieldValues);

            $this->crud->afterStore($entity, $fieldValues);
        }

        return redirect()->route($this->crud->getRouteByMethod(Method::INDEX))
            ->with('status', trans('crud.created'));
    }

    public function show($id)
    {
        $this->seo()->setTitle($this->crud->title());

        $entity = $this->crud->getRepository()->findOrFail($id);

        $fields = $this->crud->getShowFields();

        return view($this->crud->getViewByMethod(Method::SHOW), [
            'crud' => $this->crud,
            'fields' => $fields,
            'entity' => $entity,
        ]);
    }

    public function edit($id)
    {
        $this->seo()->setTitle($this->crud->title());

        $entity = $this->crud->getRepository()->findOrFail($id);

        $formClass = $this->crud->getEditFormClass();
        $form = null;

        if ($formClass) {
            /** @var Form $form */
            $form = FormBuilder::create($formClass, [
                'method' => 'patch',
                'model' => $entity,
                'route' => [$this->crud->getRouteByMethod(Method::UPDATE), $id],
            ]);
        }

        return view($this->crud->getViewByMethod(Method::EDIT), [
            'crud' => $this->crud,
            'form' => $form,
            'entity' => $entity,
        ]);
    }

    public function update($id)
    {
        $entity = $this->crud->getRepository()->findOrFail($id);

        $formClass = $this->crud->getEditFormClass();

        if ($formClass) {
            /** @var Form $form */
            $form = FormBuilder::create($formClass, [
                'method' => 'patch',
                'model' => $entity,
                'route' => $this->crud->getRouteByMethod(Method::UPDATE),
            ]);

            $form->redirectIfNotValid();

            $fieldValues = $form->getFieldValues(true);

            $this->crud->beforeUpdate($entity, $fieldValues);

            $entity = $this->crud->getRepository()->update($id, $fieldValues);

            $this->crud->afterUpdate($entity, $fieldValues);
        }

        return redirect()->route($this->crud->getRouteByMethod(Method::INDEX))
            ->with('status', trans('crud.updated'));
    }

    public function destroy($id)
    {
        $entity = $this->crud->getRepository()->findOrFail($id);

        $this->crud->beforeDestroy($entity);

        $this->crud->getRepository()->delete($id);

        $this->crud->afterDestroy($entity);

        return redirect()->route($this->crud->getRouteByMethod(Method::INDEX))
            ->with('status', trans('crud.deleted'));
    }
}
