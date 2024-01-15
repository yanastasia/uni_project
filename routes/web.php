<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    if (Auth::user()) {
        return redirect('/dashboard');
    }
    return redirect('/login');
});

//delete this later not needed
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/boards', [BoardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('boards');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/boards', BoardController::class);
    Route::delete('/boards/truncate', [BoardController::class, 'destroyAll']);
    Route::delete('/boards/{id}', [BoardController::class, 'destroy']);
    Route::put('/boards/{board}', [BoardController::class, 'update']);


    Route::get('notes/{boardTitle}/{boardId}', [NoteController::class, 'index']);
    Route::post('/notes', [NoteController::class, 'store']);
    Route::delete('/notes/{id}', [NoteController::class, 'deleteNote']);
    Route::delete('/notes/truncate/{boardId}', [NoteController::class, 'destroyAll']);
    Route::put('/notes/{note}', [NoteController::class, 'update']);
});

require __DIR__.'/auth.php';
