<?php

namespace App\Http\Controllers\Panel;

use App\Eloquent\Models\Page;
use App\Enums\Role\Permission;
use App\Http\Controllers\BaseCrudController;
use App\Http\Crud\Panel\SiteCrud;

class SiteController extends BaseCrudController
{
    public function __construct(SiteCrud $crud)
    {
        $this->middleware('can:' . Permission::PANEL_SITES_LIST->value, ['only' => ['index', 'show']]);
        $this->middleware('can:' . Permission::PANEL_SITES_CREATE->value, ['only' => ['create', 'store']]);
        $this->middleware('can:' . Permission::PANEL_SITES_EDIT->value, ['only' => ['edit', 'update']]);
        $this->middleware('can:' . Permission::PANEL_SITES_DELETE->value, ['only' => 'destroy']);

        $this->crud = $crud;
    }

    public function show($id)
    {
        /** @var Page $entity */
        $entity = $this->crud->getRepository()->findOrFail($id);

        return redirect()->route('pages.show', $entity->slug);
    }
}
