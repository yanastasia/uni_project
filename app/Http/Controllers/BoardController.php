<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use Inertia\Inertia;

class BoardController extends Controller
{
    public function index()
    {
        return Inertia::render('BoardsPage', [
            'boards' => Board::all()
        ]);
    }

    public function store(Request $request) {
        Board::create([
            'title' => $request->title,
            'description' => $request->description
        ]);
    }

    public function update(Request $request, Board $board) {
        $board->update([
            'title' => $request->title,
            'description' => $request->description
        ]);
    }

    public function destroy(Board $board) {
        $board->delete();
    }

    public function destroyAll() {
        Board::truncate();
        return response()->json(['message' => 'Board deleted successfully']);
    }

}