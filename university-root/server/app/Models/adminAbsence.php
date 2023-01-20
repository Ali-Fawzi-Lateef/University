<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class adminAbsence extends Model
{
    use HasFactory;
    /**
     * if needed to access a parent table via child table
     */

     protected $fillable = [
        'absence_date',
        'reason'
    ];

     /**
      * Prevent elqouent from creating created_at updated_at fields.
      * @var bool
      */
     public $timestamps = false;
}
