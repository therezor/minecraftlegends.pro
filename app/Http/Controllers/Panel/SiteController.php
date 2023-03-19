<?php

namespace App\Http\Controllers\Panel;

use App\Eloquent\Models\Site\Site;
use App\Eloquent\Models\User;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Criteria\OwnedByUserCriteria;
use App\Eloquent\Repositories\Site\PageRepository;
use App\Eloquent\Repositories\Site\SiteRepository;
use App\Forms\Panel\Site\CreateForm;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kris\LaravelFormBuilder\Facades\FormBuilder;
use Kris\LaravelFormBuilder\Form;

class SiteController extends Controller
{
    protected SiteRepository $siteRepository;
    protected PageRepository $pageRepository;

    public function __construct(SiteRepository $siteRepository, PageRepository $pageRepository)
    {
        $this->siteRepository = $siteRepository;
        $this->pageRepository = $pageRepository;

        $this->middleware('auth.tenant')->only(['show', 'edit', 'update', 'destroy']);
    }

    public function index()
    {
        /** @var User $user */
        $user = auth()->user();
        $site = $this->siteRepository->pushCriteria(new OwnedByUserCriteria($user))
            ->pushCriteria(new OrderByCriteria('id', 'asc'))
            ->first();

        if ($site) {
            return redirect()->route('panel.show', $site->hostname);
        }

        return redirect()->route('panel.create');
    }

    public function create()
    {
        $title = trans('panel.create.title');
        $this->seo()->setTitle($title);

        $site = $this->siteRepository->newModel();

        /** @var Form $form */
        $form = FormBuilder::create(CreateForm::class, [
            'method' => 'post',
            'model' => $site,
            'route' => 'panel.store',
        ]);

        return view('panel.create', ['title' => $title, 'site' => $site, 'form' => $form]);
    }

    public function store()
    {
        $site = $this->siteRepository->newModel();

        /** @var Form $form */
        $form = FormBuilder::create(CreateForm::class, [
            'method' => 'post',
            'model' => $site,
            'route' => 'panel.store',
        ]);

        $form->redirectIfNotValid();

        $fieldValues = $form->getFieldValues(true);
        $fieldValues['user_id'] = auth()->id();
        $fieldValues['domain'] = $fieldValues['hostname'] . '.' . config('sites.domains.0');

        $site = $this->siteRepository->create($fieldValues);
        $page = $this->pageRepository->create([
            'site_id' => $site->id,
            'name' => $site->name,
            'slug' => '/',
            'content' => [],
        ]);

        return redirect()->route('panel.show', $site->hostname)
            ->with('status', trans('crud.created'));
    }

    public function show(string $hostname, Request $request)
    {
        /** @var Site $site */
        $site = $request->get('current_site');

        $this->seo()->setTitle($site->name);

        return view('panel.show', [
            'site' => $site,
        ]);
    }

    public function edit($id)
    {
    }

    public function update($id)
    {
    }

    public function destroy(string $hostname)
    {
        /** @var User $user */
        $user = auth()->user();
        $site = $this->siteRepository->pushCriteria(new OwnedByUserCriteria($user))->findByOrFail('hostname', $hostname);

        $this->siteRepository->delete($site);

        return redirect()->route('panel.index')
            ->with('status', trans('crud.deleted'));
    }
}
