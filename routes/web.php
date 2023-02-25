<?php

use App\Enums\Role\Permission;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Panel;
use App\Http\Controllers\Sites;
use App\Http\Controllers\Panel\ImageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

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
    Route::post('images/upload', [ImageController::class, 'upload'])->name('images.upload');
    Route::post('images/fetch', [ImageController::class, 'fetch'])->name('images.fetch');

    Route::get('/', [Panel\DashboardController::class, 'index'])
        ->middleware('can:' . Permission::PANEL_DASHBOARD_VIEW->value)
        ->name('index');

    Route::resource('roles', Panel\RoleController::class);

    Route::resource('users', Panel\UserController::class);

    Route::resource('categories', Panel\CategoryController::class);

    Route::resource('sites', Panel\SiteController::class);

    Route::resource('posts', Panel\PostController::class);
});

Route::group(['prefix' => 'sites', 'as' => 'sites.', 'middleware' => ['auth']], function () {
});

require __DIR__.'/auth.php';

Route::group(['middleware' => ['auth']], function () {
    Route::resource('sites', Sites\SiteController::class);

    Route::post('vote/{id}', [PostController::class, 'vote'])
        ->name('posts.vote');
});

Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('terms', [PageController::class, 'terms'])->name('pages.terms');
Route::get('privacy', [PageController::class, 'privacy'])->name('pages.privacy');
Route::get('cookies', [PageController::class, 'cookies'])->name('pages.cookies');
Route::get('search', [HomeController::class, 'search'])->name('search');
Route::get('sitemap.xml', [SitemapController::class, 'index'])->name('sitemap.index');
Route::get('category/{slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('{slug}', [PostController::class, 'show'])->name('posts.show');

