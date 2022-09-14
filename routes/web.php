<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Panel;

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

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::group(['prefix' => 'panel', 'as' => 'panel.', 'middleware' => ['auth']], function () {
    Route::get('/', [Panel\DashboardController::class, 'index'])
        ->name('index');
    Route::resource('roles', Panel\RoleController::class)
        ->whereNumber('role')
        ->only(['index', 'create', 'edit']);
});

require __DIR__.'/auth.php';
