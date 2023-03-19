<?php

use App\Enums\Role\Permission;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Admin;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\Panel;
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


Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => ['auth']], function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])
        ->middleware('can:' . Permission::ADMIN_DASHBOARD_VIEW->value)
        ->name('index');

    Route::resource('roles', Admin\RoleController::class);

    Route::resource('users', Admin\UserController::class);

    Route::resource('categories', Admin\CategoryController::class);

    Route::resource('sites', Admin\SiteController::class);

    Route::resource('posts', Admin\PostController::class);
});

require __DIR__.'/auth.php';

Route::group(['middleware' => ['auth']], function () {
    Route::resource('panel', Panel\SiteController::class);

    Route::group(['middleware' => ['auth.tenant']], function () {
        Route::resource('panel.pages', Panel\PageController::class)->except('show');
        Route::resource('panel.blog-categories', Panel\Blog\CategoryController::class);
        Route::resource('panel.blog-posts', Panel\Blog\PostController::class);
    });

    Route::post('images/upload', [ImageController::class, 'upload'])->name('images.upload');
    Route::post('images/fetch', [ImageController::class, 'fetch'])->name('images.fetch');

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
