<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Panel;
use App\Enums\Role\Permission;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\ImageController;

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
    Route::post('images', [ImageController::class, 'store'])->name('images.upload');


    Route::get('/', [Panel\DashboardController::class, 'index'])
        ->middleware('can:' . Permission::DASHBOARD_VIEW->value)
        ->name('index');

    Route::resource('roles', Panel\RoleController::class);

    Route::resource('users', Panel\UserController::class);

    Route::resource('categories', Panel\CategoryController::class);

    Route::resource('pages', Panel\PageController::class);

    Route::resource('posts', Panel\PostController::class);
});

require __DIR__.'/auth.php';

Route::group(['middleware' => ['auth']], function () {
    Route::post('vote/{id}', [PostController::class, 'vote'])
        ->name('posts.vote');
});

Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('search', [HomeController::class, 'search'])->name('search');
Route::get('sitemap.xml', [SitemapController::class, 'index'])->name('sitemap.index');
Route::get('category/{slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('page/{slug}', [PageController::class, 'show'])->name('pages.show');
Route::get('{slug}', [PostController::class, 'show'])->name('posts.show');

