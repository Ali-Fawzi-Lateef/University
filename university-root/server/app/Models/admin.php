<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class admin extends Model
{
    use HasFactory;
    /**
     * if needed to access a parent table via child table
     */
    // public function user()
    // {
    //     return $this->belongsTo(user::class);
    // }
    protected $fillable = ['salary'];

    /**
     * Prevent elqouent from creating created_at updated_at fields.
     * @var bool
     */
    public $timestamps = false;

    public function privilege()
    {
        return $this->hasMany(privilege::class);
    }
    public function adminAbsence()
    {
        return $this->hasMany(adminAbsence::class);
    }
}
