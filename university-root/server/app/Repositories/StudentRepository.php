<?php

namespace App\Repositories;
use App\Repositories\Interfaces\IStudentRepository;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class StudentRepository implements IStudentRepository
{
    protected $student = null;

    public function getGrades()
    {
        $id = Auth::user()->id;
        return User::find($id)->grades;
    }
}
