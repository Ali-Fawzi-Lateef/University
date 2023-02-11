<?php

namespace App\Repositories\Interfaces;

use Illuminate\Http\Request;

interface ITeacherRepository
{
    public function getAllStudents();

    public function manageGrades(Request $request);
}
