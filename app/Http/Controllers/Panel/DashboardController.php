<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $this->seo()->setTitle(__('Dashboard'));

        return view('panel.dashboard');
    }
}
