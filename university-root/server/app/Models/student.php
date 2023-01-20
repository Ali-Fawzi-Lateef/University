<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student extends Model
{
    use HasFactory;
    /**
     * if needed to access a parent table via child table
     */
    public function user()
    {
        return $this->belongsTo(user::class);
    }
    protected $fillable = [
        'department',
        'stage',
        'branch',
        'annualCost',
        'totalPaid'
    ];

    /**
     * Prevent elqouent from creating created_at updated_at fields.
     * @var bool
     */
    public $timestamps = false;

    public function curriculums()
    {
        return $this->hasMany(curriculums::class);
    }
    public function courseCurriculum()
    {
        return $this->hasOne(courseCurriculum::class);
    }
    public function payment()
    {
        return $this->hasMany(payment::class);
    }
    public function homeworkScore()
    {
        return $this->hasMany(homeworkScore::class);
    }
    public function quizScore()
    {
        return $this->hasMany(quizScore::class);
    }
    public function studentAbsence()
    {
        return $this->hasMany(studentAbsence::class);
    }
}
