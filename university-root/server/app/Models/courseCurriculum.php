<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class courseCurriculum extends Model
{
    use HasFactory;
    /**
     * if needed to access a parent table via child table
     */

    protected $fillable = ['stage'];

    /**
     * Prevent elqouent from creating created_at updated_at fields.
     * @var bool
     */
    public $timestamps = false;

    public function subject()
    {
        return $this->hasMany(subject::class);
    }
    public function branch()
    {
        return $this->hasOne(branch::class);
    }
    public function department()
    {
        return $this->hasOne(department::class);
    }
    public function teacher()
    {
        return $this->hasMany(teacher::class);
    }
}
