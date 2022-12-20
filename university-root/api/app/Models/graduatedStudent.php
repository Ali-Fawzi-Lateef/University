<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class graduatedStudent extends Model
{
    use HasFactory;
    /**
     * if needed to access a parent table via child table
     */
    // public function user()
    // {
    //     return $this->belongsTo(user::class);
    // }
    protected $fillable = [
        'graduation_date',
        'final_score',
        'total_paid',
        'total_cost'
    ];

    /**
     * Prevent elqouent from creating created_at updated_at fields.
     * @var bool
     */
    public $timestamps = false;

}
