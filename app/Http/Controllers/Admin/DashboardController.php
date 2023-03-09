<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $this->seo()->setTitle(__('Dashboard'));

        return view('admin.dashboard');
    }
}
