<?php

namespace App\Http\Controllers\Sites;

use App\Eloquent\Models\Site\Site;
use App\Eloquent\Models\User;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\OwnedByUserCriteria;
use App\Eloquent\Repositories\Site\SiteRepository;
use App\Forms\Sites\Site\CreateForm;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kris\LaravelFormBuilder\Facades\FormBuilder;
use Kris\LaravelFormBuilder\Form;

class SiteController extends Controller
{
    protected SiteRepository $repository;

    public function __construct(SiteRepository $repository)
    {
        $this->repository = $repository;

        $this->middleware('site')->only(['show', 'edit', 'update', 'destroy']);
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

    public function show(string $subDomain, Request $request)
    {
        /** @var Site $site */
        $site = $request->get('current_site');

        $this->seo()->setTitle($site->name);

        return view('sites.show', [
            'site' => $site,
        ]);
    }

    public function edit($id)
    {
    }

    public function update($id)
    {
    }

    public function destroy(string $subDomain)
    {
        /** @var User $user */
        $user = auth()->user();
        $site = $this->repository->pushCriteria(new OwnedByUserCriteria($user))->findByOrFail('sub_domain', $subDomain);

        $this->repository->delete($site);

        return redirect()->route('sites.index')
            ->with('status', trans('crud.deleted'));
    }
}
