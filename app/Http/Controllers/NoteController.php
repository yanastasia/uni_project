<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Models\Board;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index($boardTitle) {
        $board = Board::where('title', $boardTitle)->first();

        if(!$board) {
            return Inertia::render('ErrorPage', ['message' => 'Board not found']);
        }

        $notes = Note::where('board_id', $board->id)->get();

        return Inertia::render('NotesPage', [
            'notes' => $notes,
        ]);

    }

    public function store(Request $request) {
        $note = new Note([
            'text' => $request->input('text'),
            'color' => $request->input('color'),
            'votes' => $request->input('votes'),
            'selected' => false,
            'board_id' => $request->input('board_id'),
        ]);
        $note->save();
        //return redirect('/notes');
        //return  back() -> with('message', ['message' => 'Name Updated!', 'timestamp' => time()]);
        return back();
        //return response()->json(['notes' => Note::where('board_id', $request->input('board_id'))->get()], 202);
    }

    public function update(Request $request, Note $note) {
        $note->update([
            'text' => $request->text,
            'color' => $request->color,
            'votes' => $request->votes,
            'selected' => $request->selected,
        ]);
    }

    public function deleteNote($noteId) {
        Note::where('id', $noteId)->delete();
    }

    public function destroyAll($boardId) {
        $notes = Note::where('board_id', $boardId)->get();
        foreach($notes as $note) {
            $note->delete();
        }
    

        return response()->json(['message' => 'Notes deleted successfully']);
    }

}
