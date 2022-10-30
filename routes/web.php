<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Panel;
use App\Enums\Role\Permission;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PageController;

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


Route::group(['prefix' => 'panel', 'as' => 'panel.', 'middleware' => ['auth']], function () {
    Route::get('/', [Panel\DashboardController::class, 'index'])
        ->middleware('can:' . Permission::DASHBOARD_VIEW->value)
        ->name('index');

    Route::resource('roles', Panel\RoleController::class)
        ->whereNumber('role');

    Route::resource('users', Panel\UserController::class)
        ->whereNumber('user');

    Route::resource('categories', Panel\CategoryController::class)
        ->whereNumber('category');

    Route::resource('pages', Panel\PageController::class)
        ->whereNumber('page');

    Route::resource('posts', Panel\PostController::class)
        ->whereNumber('post');
});

require __DIR__.'/auth.php';

Route::group(['middleware' => ['auth']], function () {
    Route::post('vote/{id}', [PostController::class, 'vote'])
        ->name('posts.vote')
        ->whereNumber('id');
});

Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('category/{slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('page/{slug}', [PageController::class, 'show'])->name('pages.show');
Route::get('{slug}', [PostController::class, 'show'])->name('posts.show');

