<?php

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
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('StartingPage'); 
});

Route::resource('/boards', BoardController::class);
Route::delete('/boards/truncate', [BoardController::class, 'destroyAll']);
Route::delete('/boards/{id}', [BoardController::class, 'destroy']);
Route::put('/boards/{board}', [BoardController::class, 'update']);


Route::get('notes/{boardTitle}/{boardId}', [NoteController::class, 'index']);
Route::post('/notes', [NoteController::class, 'store']);
Route::delete('/notes/{id}', [NoteController::class, 'deleteNote']);
Route::delete('/notes/truncate/{boardId}', [NoteController::class, 'destroyAll']);
Route::put('/notes/{note}', [NoteController::class, 'update']);




