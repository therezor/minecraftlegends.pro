<?php

namespace App\Http\Controllers\Sites;

use App\Eloquent\Models\User;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\OwnedByUserCriteria;
use App\Eloquent\Repositories\Site\SiteRepository;
use App\Enums\Crud\Method;
use App\Forms\Sites\Site\CreateForm;
use App\Http\Controllers\Controller;
use Kris\LaravelFormBuilder\Facades\FormBuilder;
use Kris\LaravelFormBuilder\Form;

class SiteController extends Controller
{
    public function __construct(SiteRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        /** @var User $user */
        $user = auth()->user();
        $site = $this->repository->pushCriteria(new OwnedByUserCriteria($user))
            ->pushCriteria(new OrderByCriteria('id', 'asc'))
            ->first();

        if ($site) {
            return redirect()->route('sites.show', $site->sub_domain);
        }

        return redirect()->route('sites.create');
    }

    public function create()
    {
        $title = trans('sites.create.title');
        $this->seo()->setTitle($title);

        $site = $this->repository->newModel();

        /** @var Form $form */
        $form = FormBuilder::create(CreateForm::class, [
            'method' => 'post',
            'model' => $site,
            'route' => 'sites.store',
        ]);

        return view('sites.create', ['title' => $title, 'site' => $site, 'form' => $form]);
    }

    public function store()
    {
        $site = $this->repository->newModel();

        /** @var Form $form */
        $form = FormBuilder::create(CreateForm::class, [
            'method' => 'post',
            'model' => $site,
            'route' => 'sites.store',
        ]);

        $form->redirectIfNotValid();

        $fieldValues = $form->getFieldValues(true);
        $fieldValues['user_id'] = auth()->id();

        $site = $this->repository->create($fieldValues);

        return redirect()->route('sites.show', $site->sub_domain)
            ->with('status', trans('crud.created'));
    }

    public function show($subDomain)
    {
        /** @var User $user */
        $user = auth()->user();
        $site = $this->repository->pushCriteria(new OwnedByUserCriteria($user))->findByOrFail('sub_domain', $subDomain);

        $this->seo()->setTitle($site->name);

        return view('sites.show', [
            'site' => $site,
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
