<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'text',
        'color',
        'votes',
        'selected',
        'board_id'
    ];

    public $timestamps = false;

   

    protected static function boot() {
        parent::boot();
        static::addGlobalScope('order', function($query) {
            $query->orderBy('color', 'asc');
        });
    }

    public function board() {
        return $this->belongsTo(Board::class);
    }
}
