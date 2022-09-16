<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Panel;
use App\Enums\Roles\Permission;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'panel', 'as' => 'panel.', 'middleware' => ['auth']], function () {
    Route::get('/', [Panel\DashboardController::class, 'index'])
        ->middleware('can:' . Permission::DASHBOARD_VIEW->value)
        ->name('index');

    Route::resource('roles', Panel\RoleController::class)
        ->whereNumber('role')
        ->only(['index', 'create', 'edit']);

    Route::resource('users', Panel\UserController::class)
        ->whereNumber('user')
        ->only(['index', 'create', 'edit']);

    Route::resource('categories', Panel\CategoryController::class)
        ->whereNumber('category')
        ->only(['index', 'create', 'edit']);
});

require __DIR__.'/auth.php';
