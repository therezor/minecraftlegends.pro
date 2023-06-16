<?php

namespace App\Http\Controllers;

use App\Models\Path;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $path = Path::find('/');
        if (!$path) {
            return view('index');
        }

        return app()->make(PathController::class)->show($path, $request);
    }
}
