<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'verified_at',
        'registered_at',
        'birthdate',
        'profile_photo_url'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Prevent elqouent from creating created_at updated_at fields.
     * @var bool
     */
    public $timestamps = false;

    /**
     * user table has a one to one relationship with the following;
     * admin, teacher, graduatedStudent, student.
     */
    public function admin()
    {
        return $this->hasOne(admin::class);
    }
    public function teacher()
    {
        return $this->hasOne(teacher::class);
    }
    public function graduatedStudent()
    {
        return $this->hasOne(graduatedStudent::class);
    }
    public function student()
    {
        return $this->hasOne(student::class);
    }
}
