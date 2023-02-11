<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grades extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'Lesson1',
        'Lesson2',
        'Lesson3',
        'Lesson4',
        'Lesson5'
    ];
    public $timestamps = false;
    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
