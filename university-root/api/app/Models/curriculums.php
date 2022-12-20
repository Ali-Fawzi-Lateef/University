<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class curriculums extends Model
{
    use HasFactory;
    /**
     * if needed to access a parent table via child table
     */
    // public function user()
    // {
    //     return $this->belongsTo(user::class);
    // }
    protected $fillable = ['name'];

    /**
     * Prevent elqouent from creating created_at updated_at fields.
     * @var bool
     */
    public $timestamps = false;

    public function lecture()
    {
        return $this->hasOne(lecture::class);
    }
    public function homework()
    {
        return $this->hasOne(homework::class);
    }
    public function quiz()
    {
        return $this->hasOne(quiz::class);
    }
}
