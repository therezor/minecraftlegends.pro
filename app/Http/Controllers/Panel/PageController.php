<?php

namespace App\Http\Controllers\Panel;

use App\Eloquent\Models\Site\Site;
use App\Eloquent\Repositories\Criteria\BelongsToSiteCriteria;
use App\Eloquent\Repositories\Criteria\OrderByCriteria;
use App\Eloquent\Repositories\Site\PageRepository;
use App\Enums\Crud\Method;
use App\Forms\Panel\Page\CreateForm;
use App\Forms\Panel\Page\SettingsForm;
use App\Http\Controllers\Controller;
use Kris\LaravelFormBuilder\Facades\FormBuilder;
use Kris\LaravelFormBuilder\Form;

class PageController extends Controller
{
    protected PageRepository $pageRepository;

    public function __construct(PageRepository $pageRepository)
    {
        $this->pageRepository = $pageRepository;
    }

    public function index($hostname)
    {
        $title = trans('panel.pages.title');
        $this->seo()->setTitle($title);

        /** @var Site $site */
        $site = request()->get('current_site');
        $pages = $this->pageRepository->pushCriteria(new BelongsToSiteCriteria($site))
            ->pushCriteria(new OrderByCriteria('id', 'asc'))
            ->get();

        return view('panel.pages.index', ['title' => $title, 'pages' => $pages, 'hostname' => $hostname]);
    }


    public function create(string $hostname)
    {
        $title = trans('panel.pages.title');
        $this->seo()->setTitle($title);

        /** @var Site $site */
        $site = request()->get('current_site');
        $page = $this->pageRepository->newModel();
        $page->site_id = $site->id;

        /** @var Form $form */
        $form = FormBuilder::create(CreateForm::class, [
            'method' => 'post',
            'model' => $site,
            'route' => ['panel.pages.store', $hostname],
        ]);

        return view(
            'panel.pages.create',
            [
                'title' => $title,
                'page' => $page,
                'form' => $form,
                'hostname' => $hostname,
            ]
        );
    }

    public function store(string $hostname)
    {
        /** @var Site $site */
        $site = request()->get('current_site');
        $page = $this->pageRepository->newModel();
        $page->site_id = $site->id;

        /** @var Form $form */
        $form = FormBuilder::create(CreateForm::class, [
            'method' => 'post',
            'model' => $page,
            'route' => ['panel.pages.store', $hostname],
        ]);

        $form->redirectIfNotValid();

        $fieldValues = $form->getFieldValues(true);
        $fieldValues['site_id'] = $site->id;
        $fieldValues['content'] = [];

        $page = $this->pageRepository->create($fieldValues);

        return redirect()->route('panel.pages.edit', [$hostname, $page->id])
            ->with('status', trans('crud.created'));
    }

    public function edit(string $hostname, string $id)
    {
        $title = trans('panel.pages.title');
        /** @var Site $site */
        $site = request()->get('current_site');
        $page = $this->pageRepository->pushCriteria(new BelongsToSiteCriteria($site))->findOrFail($id);

        /** @var Form $form */
        $form = FormBuilder::create(SettingsForm::class, [
            'method' => 'patch',
            'model' => $page,
            'route' => ['panel.pages.edit', [$hostname, $page->id]],
        ]);

        return view(
            'panel.pages.edit',
            [
                'title' => $title,
                'page' => $page,
                'hostname' => $hostname,
                'form' => $form,
            ]
        );
    }

    public function update(string $hostname, string $id)
    {
    }

    public function destroy(string $hostname, string $id)
    {
        /** @var Site $site */
        $site = request()->get('current_site');
        $page = $this->pageRepository->pushCriteria(new BelongsToSiteCriteria($site))->findOrFail($id);
        if ($page->is_main) {
            abort(404);
        }

        $this->pageRepository->delete($page);

        return redirect()->route('panel.pages.index', $hostname)
            ->with('status', trans('crud.deleted'));
    }
}
